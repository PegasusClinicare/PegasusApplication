import Redis from 'ioredis'


const redisClient = new Redis(process.env.ENVIRONMENT === "Production" ? (
  {
    host: 'redis-19708.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 19708,
    password: '1vlBGdXUIVXFEVkegOnXtcWFPMDAEnwI'
  }
) : (
  {
    host: 'redis-19708.c301.ap-south-1-1.ec2.redns.redis-cloud.com', // not working yet. create on pegasusclinicare 
    port: 19708,
    password: '1vlBGdXUIVXFEVkegOnXtcWFPMDAEnwI'
  }
))

const redisConnection = (client: Redis = redisClient) => {
  client.on("error", (error) => {
    console.log('Redis Client Error', error)
  })


  client.on("connect", () => {
    console.log(`Great... Redis connected on server ${client.options.host}`)
  })
}

export default redisConnection;
export { redisClient }
