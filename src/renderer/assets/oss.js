import OSS from 'ali-oss'
export default data => new OSS({
  accessKeyId: data.accessKeyId,
  accessKeySecret: data.accessKeySecret,
  stsToken: data.stsToken,
  endpoint: data.endpoint,
  bucket: data.bucket,
  region: data.region,
  cname: data.cname || false
})
