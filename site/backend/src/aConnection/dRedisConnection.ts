import Redis from 'ioredis'


const redisClient = new Redis({
  host: 'redis-12985.c81.us-east-1-2.ec2.redns.redis-cloud.com',
  port: 12985,
  password: 'nI7vpS63deSOiATOp5X3lZ6S8O79XUfq'
})

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
