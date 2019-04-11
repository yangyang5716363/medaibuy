import cfgsDev from './dev'
import cfgsProd from './prod'

let cfgs = cfgsDev
if (process.env.UMI_ENV === 'prod') {
  cfgs = cfgsProd
}

export default cfgs