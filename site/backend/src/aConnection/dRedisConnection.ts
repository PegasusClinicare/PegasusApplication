import Redis from 'ioredis'


const redisClient = new Redis(process.env.ENVIRONMENT === "Production" ? (
  {
    host: 'redis-10983.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 10983,
    password: 'kypo8F2ywgAPkUUfpb7TLeYMM05XK9i7'
  }
) : (
  {
    host: 'redis-10983.c301.ap-south-1-1.ec2.redns.redis-cloud.com', // not working yet. create on pegasusclinicare 
    port: 10983,
    password: 'kypo8F2ywgAPkUUfpb7TLeYMM05XK9i7'
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
