import { isSu } from './isSu'

const buildQuery = (user, q1, q2) => {
  return isSu(user) ? q1 : q2
}

export default buildQuery
