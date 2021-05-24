import * as yup from 'yup'

const outletSlugRegExp = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^.]$/
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const validations = {
  outletSchema: yup.object().shape({
    name: yup.string().min(3, 'Minimun 3 karakter').required('Wajib diisi'),
    descritpion: yup.string(),
    slug: yup
      .string()
      .trim()
      .min(4, 'Minimum 4 karakter')
      .max(20, 'Maximum 20 karakter')
      .matches(outletSlugRegExp, 'Hanya boleh berupa huruf, angka, underscore dan titik')
      .required('Wajib diisi'),
    cover: yup.string().url('URL gambar tidak valid').required('Wajib diisi'),
    phone: yup.string().matches(phoneRegExp, 'Nomor tidak valid').required('Wajib diisi'),
    payment: yup.string().required('Wajib diisi'),
    sheet_id: yup.string().required('Wajib diisi'),
  }),
}

export default validations
