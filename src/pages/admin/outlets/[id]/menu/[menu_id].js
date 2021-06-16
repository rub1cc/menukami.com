import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import Header from 'components/Header'
import { Field, Form, Formik, useFormikContext } from 'formik'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import Dropzone from 'react-dropzone'
import { useMutation, useQuery } from 'react-query'
import { storage } from 'utils/firebaseClient'
import validations from 'utils/validations'
import Select from 'react-select'
import DefaultErrorPage from 'next/error'
import FullScreenLoading from 'components/FullScreenLoading'
import RippleButton from 'components/RippleButton'
import { CircularProgressbar } from 'react-circular-progressbar'

const FileUpload = () => {
  const { values, setFieldValue } = useFormikContext()
  const [progress, setProgress] = useState(null)

  const onSelectFile = (files) => {
    const image = files[0]
    if (image) {
      const filename = `${new Date().getTime()}_${image.name}`
      const upload = storage.ref(`images/menu/${filename}`).put(image)
      upload.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          if (progress == 100) {
            setProgress(null)
          } else {
            setProgress(progress)
          }
        },
        (error) => {
          console.log(error)
          alert('Gagal menggunggah file')
        },
        () => {
          storage
            .ref('images/menu')
            .child(filename)
            .getDownloadURL()
            .then((url) => {
              setFieldValue('image', url)
            })
        }
      )
    }
  }

  if (progress > 0) {
    return (
      <section className="focus:outline-none mt-1 relative grid place-items-center w-full h-56">
        <div style={{ width: 50, height: 50 }}>
          <CircularProgressbar value={progress} text={`${progress}%`} />
        </div>
      </section>
    )
  }

  return (
    <section className="focus:outline-none mt-1 relative cursor-pointer">
      <Dropzone onDrop={onSelectFile} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="focus:outline-none">
            <input {...getInputProps()} />
            <div className="text-gray-400 w-full h-full">
              {values?.image ? (
                <>
                  <div className="bg-gray-900 absolute inset-0"></div>
                  <img
                    src={values?.image}
                    className="w-full h-56 object-contain relative"
                    alt="product"
                  />
                  <div className="absolute w-8 h-8 top-0 right-0 mr-2 mt-2 bg-white shadow rounded-full grid place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="border-2 border-dashed border-gray-300 flex flex-col justify-center items-center w-full h-56">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="px-4 text-center">
                    Gunakan gambar berkualits untuk menarik perhatian pembeli
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Dropzone>
    </section>
  )
}

const resetNotif = {
  show: false,
  error: true,
  message: null,
}

function App() {
  const router = useRouter()
  const { id, menu_id } = router.query
  const [notif, setNotif] = useState(resetNotif)
  const [isShowConfirm, setIsShowConfirm] = useState(false)

  const { data: menu, isLoading: menuLoading } = useQuery(['getMyProduct', menu_id], () =>
    fetch(`/api/admin/menu/${menu_id}`).then((res) => res.json())
  )

  const { data: categories, isLoading } = useQuery(['getMyOutletMenus', id], () =>
    fetch(`/api/admin/outlets/${id}/categories`).then((res) => res.json())
  )

  const options = useMemo(
    () => categories?.map((item) => ({ value: item.id, label: item.name })),
    categories
  )

  const updateMenu = useMutation(
    (data) =>
      fetch(`/api/admin/menu/${menu_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, category_id: data?.category_id?.value }),
      }),
    {
      onSettled: (data) => {
        data.json().then((res) => {
          setNotif({
            show: true,
            error: !data.ok,
            message: res.message,
          })

          setTimeout(() => {
            data.ok ? router.back() : setNotif(resetNotif)
          }, 1000)
        })
      },
    }
  )

  const deleteMenu = useMutation(
    () =>
      fetch(`/api/admin/menu/${menu_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSettled: (data) => {
        data.json().then((res) => {
          setNotif({
            show: true,
            error: !data.ok,
            message: res.message,
          })

          data.ok && router.back()

          setTimeout(() => {
            !data.ok && setNotif(resetNotif)
          }, 1000)
        })
      },
    }
  )

  if (menuLoading) return <FullScreenLoading />

  if (!menu) return <DefaultErrorPage statusCode={404} />

  return (
    <Formik
      initialValues={{
        category_id:
          typeof menu?.category_id === 'string'
            ? options?.find((item) => item.value === menu?.category_id)
            : null,
        name: menu?.name ?? '',
        image: menu?.image ?? '',
        price: menu?.price ?? 0,
        sale_price: menu?.sale_price ?? 0,
      }}
      onSubmit={(values) => {
        updateMenu.mutate(values)
      }}
      validationSchema={validations.productSchema}
      validateOnMount={true}
    >
      {({ isValid, setFieldValue, values }) => (
        <Form>
          <div className="pb-8">
            {isShowConfirm ? (
              <div className="absolute inset-0 flex h-screen z-20 bg-gray-900 bg-opacity-50 justify-center items-center">
                <div className="max-w-sm w-full bg-white p-4 rounded">
                  <p className="font-bold text-lg">Hapus menu?</p>
                  <span>Proses ini tidak dapat diurungkan</span>
                  <div className="flex space-x-4 w-full mt-4">
                    <RippleButton
                      onClick={() => setIsShowConfirm(false)}
                      className={`rounded border bg-red-800 text-white text-center px-4 py-2 focus:outline-none font-normal cursor-pointer flex w-1/2 justify-center`}
                    >
                      <div className="text-center">Batalkan</div>
                    </RippleButton>
                    <RippleButton
                      onClick={() => deleteMenu.mutate()}
                      className={`rounded border border-red-800 text-red-800 text-center px-4 py-2 focus:outline-none font-normal cursor-pointer flex w-1/2 justify-center`}
                    >
                      <div className="text-center">Ya, hapus</div>
                    </RippleButton>
                  </div>
                </div>
              </div>
            ) : null}
            <Header
              title={null}
              leftComponent={<BackButton />}
              title="Tambah Menu"
              rightComponent={
                <button className="w-full my-4" type="submit" disabled={!isValid}>
                  <div
                    className={`flex rounded text-white text-center px-4 py-1 justify-between focus:outline-none text-sm ${
                      !isValid ? 'bg-gray-300' : 'bg-gray-800'
                    }`}
                  >
                    <div className="text-center w-full uppercase">Simpan</div>
                  </div>
                </button>
              }
            />
            <div className="space-y-4">
              <MobileLayout>
                <div className="grid grid-cols-1">
                  <div className="fixed top-0 mt-20 inset-x-0 z-50 max-w-md mx-auto px-4 md:px-0">
                    {notif.show ? (
                      <button
                        className="flex space-x-2 rounded-md bg-gray-900 text-white p-4 w-full text-left"
                        onClick={() => {
                          deleteMenu.reset()
                          updateMenu.reset()
                        }}
                      >
                        <span>
                          {notif.error ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )}
                        </span>
                        <span>{notif.message}</span>
                      </button>
                    ) : null}
                  </div>

                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <Field name="image">
                        {({ meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <FileUpload />
                              {meta.touched && meta.error && (
                                <div className="text-red-500">{meta.error}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="name">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nama Menu
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="text"
                                  className="p-2 outline-none flex-1 block w-full rounded-md sm:text-sm border border-gray-300"
                                  {...field}
                                />
                              </div>
                              {meta.touched && meta.error && (
                                <div className="text-red-500">{meta.error}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="description">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Deskripsi
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="text"
                                  className="p-2 outline-none flex-1 block w-full rounded-md sm:text-sm border border-gray-300"
                                  {...field}
                                />
                              </div>
                              {meta.touched && meta.error && (
                                <div className="text-red-500">{meta.error}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="category_id">
                        {({ meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Kategori
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <Select
                                  options={options}
                                  isLoading={isLoading}
                                  className="w-full"
                                  defaultValue={values.category_id}
                                  onChange={(e) => setFieldValue('category_id', e)}
                                  loadingMessage="Harap tunggu"
                                />
                              </div>
                              {meta.touched && meta.error && (
                                <div className="text-red-500">{meta.error}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="price">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Harga
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="number"
                                  className="p-2 outline-none flex-1 block w-full rounded-md sm:text-sm border border-gray-300"
                                  {...field}
                                />
                              </div>
                              {meta.touched && meta.error && (
                                <div className="text-red-500">{meta.error}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="sale_price">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Harga Diskon
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="number"
                                  className="p-2 outline-none flex-1 block w-full rounded-md sm:text-sm border border-gray-300"
                                  {...field}
                                />
                              </div>
                              {meta.touched && meta.error && (
                                <div className="text-red-500">{meta.error}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-6 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold">Hapus Menu</span>
                      <span>Pelanggan tidak dapat memesan menu ini lagi jika dihapus.</span>
                    </div>
                    <div className="mx-4 md:mx-0 mt-4 bg-transparent">
                      <RippleButton
                        onClick={() => setIsShowConfirm(true)}
                        className={`flex rounded border border-red-800 text-red-800 text-center px-4 py-1 justify-between focus:outline-none text-sm font-normal cursor-pointer`}
                      >
                        <div className="text-center w-full uppercase">Hapus</div>
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </MobileLayout>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default withPageAuthRequired(App)
