const configs = {
  MAX_FILE_SIZE: 1 * 1024 * 1024,
}

const getConfig = (configName) => configs[configName]

export default getConfig
