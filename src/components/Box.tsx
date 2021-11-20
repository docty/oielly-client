import React, { HTMLAttributes, LegacyRef } from 'react';
import classnames from 'classnames';
 


export const Box = (props: IBox) => {
     
    
    return (
        <div 
            style={props.style} 
            className={classnames([
            'border p-1 rounded-sm inline-block',
            props.className])}
            ref={props.refer}
        >
            {props.children}
        </div>
    );
};
 
export interface IBox extends Pick<HTMLAttributes<React.ReactNode>, 'children' | 'style' | 'className'>   {
    refer ?: LegacyRef<HTMLDivElement>
    
}


// interface If extends RefObject<HTMLDivElement> {
//     na: string;
// } 