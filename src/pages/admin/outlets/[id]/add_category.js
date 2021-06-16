import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import Header from 'components/Header'
import { Field, Form, Formik } from 'formik'
import MobileLayout from 'layouts/MobileLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useMutation } from 'react-query'
import validations from 'utils/validations'

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
      fetch(`/api/admin/outlets/${router.query.id}/categories`, {
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
      initialValues={{
        name: '',
      }}
      onSubmit={(values) => {
        mutation.mutate(values)
      }}
      validationSchema={validations.menuSchema}
      validateOnMount={true}
    >
      {({ isValid }) => (
        <Form>
          <div className="pb-8">
            <Header
              title={null}
              leftComponent={<BackButton />}
              title="Tambah Kategori"
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
