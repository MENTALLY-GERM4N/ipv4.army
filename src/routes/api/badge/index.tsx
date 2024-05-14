import { type RequestHandler } from '@builder.io/qwik-city';
import badge from 'shields.io/badge-maker'; 

export const onGet: RequestHandler = async (res) => {
  res.headers.set("content-type", "image/svg+xml;charset=utf-8")

  let options = {}
  
  res.query.forEach((v,k) => {
    // @ts-ignore
    options[k] = v
  })

  // @ts-ignore
  res.send(200, badge.makeBadge(options))
};