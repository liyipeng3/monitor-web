
export async function GET() {
    const res = await fetch('http://192.168.1.123/cgi-bin/luci/istore/u/network/statistics/', {
        headers: {
            cookie: 'sysauth_http=e5f796b1bbafae56ae18111aee9817e4'
        }
    })
    const data = await res.json()

    return Response.json(data )
}
