const axios = require('axios');

module.exports.getCond = async (province,res) => {
  let succ = false;
  res.setHeader('Content-Type','application/json');

  const headers = {
    headers: {
      'accept': 'application/json',
      'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZiMDNlNTgzMWM4OGE3YjcxMDJiYjJkNDc2OTA5MjY1OTdhODk1YjlmMmIyMTEwZGQ5NDE1YTFkMzQ0MmNkMzMyMTQ0ZGNjNjkzODNiYzNmIn0.eyJhdWQiOiIyIiwianRpIjoiNmIwM2U1ODMxYzg4YTdiNzEwMmJiMmQ0NzY5MDkyNjU5N2E4OTViOWYyYjIxMTBkZDk0MTVhMWQzNDQyY2QzMzIxNDRkY2M2OTM4M2JjM2YiLCJpYXQiOjE1NjI0NTUyNzAsIm5iZiI6MTU2MjQ1NTI3MCwiZXhwIjoxNTk0MDc3NjcwLCJzdWIiOiI1MDMiLCJzY29wZXMiOltdfQ.LUacKrpowhZE9emE6ctot_p7V2qU3ggocxMGPA_joGU510MocoZjiGAN-RInDRMSRJGCrgrUTVEZN6aDGMxKaBNiJoRrd_vivHzAPHUzNby66c5YXx-Q16LFVeHbXZEak5SwdvV0_bpVeDhUZLRMg_BDWgZqEF7fGa4Xj2eNG5DG0HhoeKl9DY9bBXKlalSzd5u86KimUnVWm7avEhRE6I0I63-P9_qGaPRk5NkfgJhZWUlHShY7itajVwzYPnUL2LBKJyvyMZtzQSbqJgHrZfANGzo61ymc0Y0pI8ZB4pxb0_D3kZ4NDhDZl3ffLdMmdrSIGcu0ryOfZCX6uTBTiqEjB98lw47C2vLH4N3C2NVDjgga8A75FWtzrtLZP17irzlOnqjok8oJKuh59fnksI4wolTVc4FI_ib_UMlAGYKPxogXV-4J3P6Q8vIk1HHxwLfbNsXs9WABFi-YcXmxorZY25P-cBx3oQNkA3mX7UBd-b1lCOohjXnebb4xEN-cuZRafT7QMofrAR1TD5SqFE9WIaABlPHaqjSAvMoLoRygKymbxzcl54FJEIvjQ9o51AcUtYWVI1rikYcYKxm9eAaiKl4XILB6uY0lDHfRxKFnK8ROM2NWEAsBVBVGKUxPwzzh9ne6IAu7hj2f64J9U5GpnGj7lD6hLPIeTxzTXJg'
    }
  }

  const url = encodeURI('https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=' + province + '&fields=cond');

  await axios.get(url, headers).then( response => {
    res.json({ fulfillmentText: "สภาพอากาศวันนี้ของจังหวัด "+ province + " : " + convCond(response.data.WeatherForecasts[0].forecasts[0].data.cond) });
    succ = true;
  }).catch( error => {
    console.log(error.response.status);
  });

  return succ;
}

const convCond = cond => {
  if (cond === 1)
    return "ท้องฟ้าแจ่มใส"
  else if (cond === 2)
    return "มีเมฆบางส่วน"
  else if (cond === 3)
    return "เมฆเป็นส่วนมาก"
  else if (cond === 4)
    return "มีเมฆมาก"
  else if (cond === 5)
    return "ฝนตกเล็กน้อย"
  else if (cond === 6)
    return "ฝนปานกลาง"
  else if (cond === 7)
    return "ฝนตกหนัก"
  else if (cond === 8)
    return "ฝนฟ้าคะนอง"
  else if (cond === 9)
    return "อากาศหนาวจัด"
  else if (cond === 10)
    return "อากาศหนาว"
  else if (cond === 11)
    return "อากาศเย็น"
  else if (cond === 12)
    return "อากาศร้อนจัด"
}
