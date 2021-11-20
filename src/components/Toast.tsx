import classnames from 'classnames';
import { HTMLAttributes, RefObject } from 'react';

export const Toast = (props: IToast) => {
    return (
        <div className={classnames([
            'fixed bottom-5 transistion-left  left-0 shadow p-2 border rounded inline-block bg-pink-700',
            props.className])}
            ref={props.refs}
            
        >
            <h3 className={'text-xl font-bold border-b pb-3 text-white'}>{props.title}</h3>
            <p className={'pt-3 text-white'}>{props.message} </p>
        </div>
    )
}

export interface IToast extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    message?: string;
    refs?: RefObject<HTMLDivElement>;
}