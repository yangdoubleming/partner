import { axios } from '@/utils/request'

import { fileServiceApi } from './config'

// uploadFile
export function uploadFile (data) {
  return axios({
    url: fileServiceApi + '/file-upload',
    method: 'post',
    data: data
  })
}

/**
 * params: {folder:"foloder"}
 *
 * 参数带上文件所放的文件夹
 *
 * /file-upload?folder=user
 */
const uploadUrl = process.env.VUE_APP_BASE_API + fileServiceApi + `/file-upload`
export { uploadUrl }
