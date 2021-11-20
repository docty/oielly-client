import { Children, ReactNode, HTMLAttributes } from "react";
import classnames from 'classnames';


export const Rating = (props: IRating) => {
    const value = convertToArray(props.value);
    const remains =  convertToArray(5-props.value);
    return(
        <div className={props.className} style={props.style}>
            {
                Children.toArray(value.map(() => (
                    <span className={classnames([
                        'icon-star-full2 mx-1 ',
                        props.activeColor])}
                    ></span>
                )))
            }
            { 
                Children.toArray(remains.map(() => (
                    <span className={classnames([
                        'icon-star-empty3 mx-1',
                        props.inactiveColor])}
                    ></span>
                )))
            }
           
        </div>
    )
}

const convertToArray = (value: number) => {
    const holder:number[] = [];
    for (let index = 0; index < value; index++) {
        holder.push(index);
        
    }
    return holder;
}

export interface IRating extends HTMLAttributes<ReactNode> {
    value: number;
    activeColor?: string;
    inactiveColor?: string;
}