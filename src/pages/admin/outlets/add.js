import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import Header from 'components/Header'
import { Field, Form, Formik, useFormikContext } from 'formik'
import MobileLayout from 'layouts/MobileLayout'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Dropzone from 'react-dropzone'
import { useMutation } from 'react-query'
import { storage } from 'utils/firebaseClient'
import validations from 'utils/validations'

const RichTextEditor = dynamic(import('react-quill'), {
  ssr: false,
})

const FileUpload = () => {
  const { values, setFieldValue } = useFormikContext()
  const [progress, setProgress] = useState(null)

  const onSelectFile = (files) => {
    const image = files[0]
    if (image) {
      const filename = `${new Date().getTime()}_${image.name}`
      const upload = storage.ref(`images/logo/${filename}`).put(image)
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
            .ref('images/logo')
            .child(filename)
            .getDownloadURL()
            .then((url) => {
              setFieldValue('logo', url)
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
              {values?.logo ? (
                <>
                  <div className="bg-gray-900 absolute inset-0"></div>
                  <img
                    src={values?.logo}
                    className="w-full h-56 object-contain relative"
                    alt="logo"
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
                  <p>Belum ada logo</p>
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
  const [notif, setNotif] = useState(resetNotif)

  const mutation = useMutation(
    (data) =>
      fetch(`/api/admin/outlets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        mutation.mutate(values)
      }}
      validationSchema={validations.outletSchema}
      validateOnMount={true}
    >
      {({ isValid, values, setFieldValue }) => (
        <Form>
          <div className="pb-8">
            <Header
              title={null}
              leftComponent={<BackButton />}
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
                        onClick={() => mutation.reset()}
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
                    <div className="px-4 py-5 bg-white space-y-4 sm:p-6">
                      <Field name="logo">
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
                                Nama Outlet
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
                        {({ meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Deksripsi
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <RichTextEditor
                                  value={values.description}
                                  onChange={(value) => setFieldValue('description', value)}
                                />
                              </div>
                              {meta.touched && meta.error && (
                                <div className="text-red-500">{meta.error}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>

                      <Field name="location">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Lokasi
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="text"
                                  className="p-2 outline-none flex-1 block w-full rounded-md sm:text-sm border border-gray-300"
                                  placeholder="Kemayoran, Jakarta Pusat"
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

                      <Field name="slug">
                        {({ field, meta }) => (
                          <div className="opacity-75">
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Custom Link
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="p-2 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-normal">
                                  https://menukami.com/
                                </span>
                                <input
                                  type="text"
                                  className="p-2 outline-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                  placeholder="outletku"
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

                      <Field name="phone">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nomor Whatsapp (untuk terima order)
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="p-2 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                  +62
                                </span>
                                <input
                                  type="text"
                                  className="p-2 outline-none flex-1 block w-full rounded-r-md sm:text-sm border border-gray-300"
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
                      <Field name="payment">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Metode Pembayaran
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="text"
                                  className="p-2 outline-none flex-1 block w-full rounded-md sm:text-sm border border-gray-300"
                                  placeholder="Bank Transfer, OVO, DANA, Gopay"
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

                      <Field name="tnc">
                        {({ meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Peryaratan & Ketentuan
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <RichTextEditor
                                  value={values.tnc}
                                  onChange={(value) => setFieldValue('tnc', value)}
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
