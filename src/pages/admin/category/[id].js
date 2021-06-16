import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import { Field, Form, Formik } from 'formik'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useMutation, useQuery } from 'react-query'
import validations from 'utils/validations'
import DefaultErrorPage from 'next/error'
import Ripples from 'react-ripples'
import RippleButton from 'components/RippleButton'

const resetNotif = {
  show: false,
  error: true,
  message: null,
}

function App() {
  const router = useRouter()
  const [notif, setNotif] = useState(resetNotif)
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const { id } = router.query

  const { data: category, isLoading } = useQuery(['getMyCategory', id], () =>
    fetch(`/api/admin/category/${id}`).then((res) => res.json())
  )

  const updateMenu = useMutation(
    (data) =>
      fetch(`/api/admin/category/${id}`, {
        method: 'PUT',
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

  const deleteMenu = useMutation(
    () =>
      fetch(`/api/admin/category/${id}`, {
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

  if (isLoading) return <FullScreenLoading />

  if (!category) return <DefaultErrorPage statusCode={404} />

  return (
    <Formik
      initialValues={{
        name: category?.name ?? '',
      }}
      enableReinitialize={true}
      onSubmit={(values) => {
        updateMenu.mutate(values)
      }}
      validationSchema={validations.menuSchema}
      validateOnMount={true}
    >
      {({ isValid }) => (
        <Form>
          <div className="pb-8 relative">
            {isShowConfirm ? (
              <div className="absolute inset-0 flex h-screen z-20 bg-gray-900 bg-opacity-50 justify-center items-center">
                <div className="max-w-sm w-full bg-white p-4 rounded">
                  <p className="font-bold text-lg">Hapus kategori dan menu didalamnya?</p>
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
              title="Edit Kategori"
              rightComponent={
                <button className="w-full my-4" type="submit" disabled={!isValid}>
                  <Ripples>
                    <div
                      className={`flex rounded text-white text-center px-4 py-1 justify-between focus:outline-none text-sm ${
                        !isValid ? 'bg-gray-300' : 'bg-gray-800'
                      }`}
                    >
                      <div className="text-center w-full uppercase">Simpan</div>
                    </div>
                  </Ripples>
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
                          updateMenu.reset()
                          deleteMenu.reset()
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
                      <Field name="name">
                        {({ field, meta }) => (
                          <div>
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company_website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nama Kategori
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
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-6 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold">Hapus Kategori</span>
                      <span>
                        Jika dihapus, kategori dan seluruh isi menunya juga akan terhapus.
                      </span>
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
