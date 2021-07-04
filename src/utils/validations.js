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
    location: yup.string().required('Wajib diisi'),
    tnc: yup.string().required('Wajib diisi'),
    logo: yup.string().url('URL gambar tidak valid').required('Wajib diisi'),
    phone: yup.string().matches(phoneRegExp, 'Nomor tidak valid').required('Wajib diisi'),
    payment: yup.string().required('Wajib diisi'),
  }),
  menuSchema: yup.object().shape({
    name: yup.string().required('Wajib diisi'),
  }),
  productSchema: yup.object().shape({
    category_id: yup.object({ value: yup.string(), label: yup.string() }).required('Wajib diisi'),
    name: yup.string().min(3, 'Minimun 3 karakter').required('Wajib diisi'),
    descritpion: yup.string(),
    image: yup.string().url('URL gambar tidak valid').required('Wajib diisi'),
    price: yup.number('Harus berupa angka').required('Wajib diisi'),
    sale_price: yup.number('Harus berupa angka').required('Wajib diisi'),
  }),
}

export default validations
