export const isSu = (user) => process.env.SUID.split(',').includes(user.sub)
