import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'
import BackButton from 'components/BackButton'
import FullScreenError from 'components/FullScreenError'
import FullScreenLoading from 'components/FullScreenLoading'
import Header from 'components/Header'
import PreviewMenu from 'components/PreviewMenu'
import { Field, Form, Formik } from 'formik'
import DesktopLayout from 'layouts/DesktopLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import validations from 'utils/validations'

function LogoutButton() {
  return (
    <span className="inline-block w-full text-right">
      <a href="/api/auth/logout" className="px-2 rounded text-sm focus:outline-none">
        Logout
      </a>
    </span>
  )
}

const resetNotif = {
  show: false,
  error: true,
  message: null,
}

function App() {
  const router = useRouter()
  const { id } = router.query

  const [notif, setNotif] = useState(resetNotif)

  if (!id) {
    return null
  }

  const { data, error, isLoading } = useQuery('getOutletData', () =>
    fetch(`/api/admin/outlet/${id}`).then((res) => res.json())
  )

  const mutation = useMutation(
    (data) =>
      fetch(`/api/admin/outlet/${id}`, {
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
            setNotif(resetNotif)
          }, 2000)
        })
      },
    }
  )

  if (isLoading) {
    return <FullScreenLoading />
  }

  if (error || !data) {
    return <FullScreenError />
  }

  const initialValues = { ...data }

  return (
    <div className="pb-8">
      <Header title={null} leftComponent={<BackButton />} rightComponent={<LogoutButton />} />
      <div className="space-y-4">
        <DesktopLayout>
          <div className="grid grid-cols-1 md:grid-cols-2">
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
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              onSubmit={(values) => {
                // eslint-disable-next-line no-unused-vars
                const { id, user_id, slug, ...other } = values
                mutation.mutate(other)
              }}
              validationSchema={validations.outletSchema}
              validateOnMount={true}
            >
              {({ isValid, dirty, values }) => (
                <>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <Form className="space-y-6 ">
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
                                  <span className="p-2 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    https://menukami.com/
                                  </span>
                                  <input
                                    type="text"
                                    disabled
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

                        <Field name="cover">
                          {({ field, meta }) => (
                            <div>
                              <div className="col-span-3 sm:col-span-2">
                                <label
                                  htmlFor="company_website"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Cover
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                  <input
                                    type="text"
                                    className="p-2 outline-none flex-1 block w-full rounded-md sm:text-sm border border-gray-300"
                                    placeholder="Link ke file"
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

                        <Field name="sheet_id">
                          {({ field, meta }) => (
                            <div>
                              <div className="col-span-3 sm:col-span-2">
                                <label
                                  htmlFor="company_website"
                                  className="text-sm font-medium text-gray-700 flex justify-between items-center"
                                >
                                  <span>Google Sheet ID </span>
                                  <a
                                    href="https://docs.google.com/spreadsheets/d/17he1PUz8ivSLFPlvxw4TFhv8XQmGRIAgwnAMFfGDbpg/copy"
                                    className="text-sm underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Buat spreadsheet
                                  </a>
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

                        <small className="inline-block space-y-2">
                          <div>
                            Posisi ID berada di antara "/d/" dan "/edit" pada URL spreadsheet.
                          </div>
                          <div className="p-2 bg-gray-200 rounded-md">
                            https://docs.google.com/spreadsheets/d/{' '}
                            <b className="text-blue-500">SPREADSHEET_ID</b>/edit#gid=0
                          </div>
                        </small>

                        <button className="w-full my-4" type="submit" disabled={!isValid || dirty}>
                          <div
                            className={`flex rounded-lg text-white text-center p-3 justify-between focus:outline-none ${
                              !isValid || dirty ? 'bg-gray-300' : 'bg-gray-800'
                            }`}
                          >
                            <div className="text-center w-full">Simpan</div>
                          </div>
                        </button>
                      </Form>
                    </div>
                  </div>
                  <PreviewMenu sheetId={values.sheet_id} />
                </>
              )}
            </Formik>
          </div>
        </DesktopLayout>
      </div>
    </div>
  )
}

export default withPageAuthRequired(App)
