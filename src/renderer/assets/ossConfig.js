// 备份文件存储空间
const backupFileBucket = {
  domain: '',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com',
  bucket: 'backup-file-bucket',
  region: 'oss-cn-shenzhen.aliyuncs.com'
}

// 业务相关 文件空间
const bussinessFileBucket = {
  domain: 'https://bussiness-file-bucket.oss-cn-shenzhen.aliyuncs.com',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com',
  bucket: 'bussiness-file-bucket',
  region: 'oss-cn-shenzhen.aliyuncs.com'
}

// 静态资源文件空间
const staticResourcesFileBucket = {
  domain: 'https://static-resources-file-bucket.oss-cn-shenzhen.aliyuncs.com',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com',
  bucket: 'static-resources-file-bucket',
  region: 'oss-cn-shenzhen.aliyuncs.com'
}

// 临时文件空间
const tempFileBucket = {
  domain: '',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com',
  bucket: ' temp-file-bucket',
  region: 'oss-cn-shenzhen.aliyuncs.com'
}

// 测试文件空间
const vschoolSolution = {
  domain: '',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com',
  bucket: ' vschool-solution',
  region: 'oss-cn-shenzhen.aliyuncs.com'
}

const ossConfig = {
  backupFileBucket,
  bussinessFileBucket,
  staticResourcesFileBucket,
  tempFileBucket,
  vschoolSolution
}

export default ossConfig
