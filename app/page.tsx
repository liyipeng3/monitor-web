'use client'
import {useRequest} from "ahooks";
import dayjs from "dayjs";
import {useEffect, useState} from "react";


const bytesToSize = (bytes: number) => {
    if (bytes < 1e3)
        return `${bytes} B`;
    let size = 1e3
        , unitIndex = 0;
    for (let p = bytes / 1e3; p >= 1e3; p /= 1e3)
        size *= 1e3,
            unitIndex++;
    const unitList = [" KB", " MB", " GB", " TB", " PB", " EB"];
    return (bytes / 100 / (size / 100)).toFixed(1) + unitList[unitIndex]
}

const getTime = () => {
    const now = dayjs();
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const week = daysOfWeek[now.day()];
    const today = now.format('YYYY年MM月DD日');
    const hour = now.format('HH');
    const minute = now.format('mm');
    const second = now.format('ss');

    return {
        week,
        today,
        hour,
        minute,
        second,
        time: `${hour}:${minute}:${second}`
    }
}

export default function Home() {

    const [time, setTime] = useState(getTime());
    const {data} = useRequest(async () => {
        const res = await fetch('/api/data', {
            headers: {
                cookie: 'sysauth_http=e5f796b1bbafae56ae18111aee9817e4'
            }
        });
        const data = await res.json();
        const list = data?.result?.items;
        return list[list.length - 1];
    }, {
        pollingInterval: 1500,
    })


    useEffect(() => {
        setInterval(() => {
            setTime(getTime())
        }, 100)
    }, []);

    return (
        <div
            className="bg-black text-white items-center justify-items-center min-h-screen px-14 pt-12 pb-5 font-[family-name:var(--font-cool)]">
            <main className="flex flex-col items-center justify-between">
                <div className='text-[40px] flex justify-between flex-row w-full'>
                    <div>{time.week}</div>
                    <div>{time.today}</div>
                </div>
                <br />
                <div className='flex flex-row items-end -mt-2'>
                    <div className='text-[148px] h-36 leading-[138px] '>{time.hour}:{time.minute}</div>
                    <div className='text-7xl translate-y-1.5 w-28'>:{time.second}</div>
                </div>
            </main>
            <div className="flex flex-wrap items-center justify-center mt-10 text-[22px]">
                <span className="mr-6">下载：{bytesToSize(data?.downloadSpeed || 0)}/s</span>
                <span>上传：{bytesToSize(data?.uploadSpeed || 0)}/s</span>
            </div>
        </div>
    );
}
