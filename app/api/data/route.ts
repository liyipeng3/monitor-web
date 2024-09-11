
export async function GET() {
    const res = await fetch('http://192.168.1.123/cgi-bin/luci/istore/u/network/statistics/', {
        headers: {
            cookie: 'sysauth_http=33d87fcf98121b46f3876791a02cff35'
        },
        cache: 'no-store'
    })
    const data = await res.json()

    return Response.json(data )
}
