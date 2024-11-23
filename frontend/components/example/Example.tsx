import style from './style.module.css';
import {useData} from "vike-react/useData";
import {ChangeEvent, useRef, useState} from "react";
import {Data} from "pages/index/+data";

export function Example() {
    const data = useData<Data>();
    const input = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState(input.current?.value || '')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        setValue(e.target.value)
    }

    console.log(data)

    return (
        <div className={style.kotek}>
            <p>example component</p>
            <input type="text" name={'test'} onChange={onChange} ref={input}/>
            <p>{data?.example}</p>
            <p>input value: {value}</p>
        </div>
    )
}