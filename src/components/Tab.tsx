import React, { Children, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { style } from 'typestyle'


export const Tab = (props: ITab) => {
    const itemHead = Children.toArray(props.children);
    const [state, setState] = React.useState<number>(0);
    
    return (
        <div>
           <div className={classnames(['flex gap-3'])}>
                {Children.toArray(itemHead.map((i:any, index:number) => 
                    <TabHeader 
                        text={i.props.text}
                        icon={i.props.icon} 
                        clickTab={() => setState(index)}
                        childIndex={index}
                        selectedIndex={state}
                        direction={props.direction} 
                    />
                ))}
            </div>
                  
           
            <TabContent>{itemHead[state]}</TabContent>
        </div>
    );
};
 

export const TabItem = (props: ITabItem) => {
    return <div>{props.children}</div>;
};


const TabHeader = ({text, icon, clickTab, childIndex, selectedIndex, direction, styling}: ITabHeader) => {
        
    const styleName =  childIndex ===  selectedIndex && 'bg-pink-800 text-white';    
    return (
        <div 
            className={classnames([
                'py-4 px-6 border cursor-pointer hover:bg-pink-400 hover:text-white font-bold text-base flex-1 text-center',
                styleName])
            } 
            onClick={clickTab}
        >
            {icon && (<i className={icon}></i>) }
            <span style={{marginLeft: '5px'}}>{text}</span>
            
        </div>
    );
};

const TabContent = (props: Pick<HTMLAttributes<React.ReactNode>, 'children' | 'style'>) => {
    return (
        <div className={classnames(['p-1', style({minWidth: '85%'})])} style={props.style}>{props.children}</div>
    );
};


 

export interface ITab extends Pick<HTMLAttributes<React.ReactNode>, 'children' | 'style' | 'className'> {
    direction?: 'row' | 'col'; 
    styling?: IStyling
}


interface ITabItem extends ITab {
    text?: string;
    icon?: string;
    
}

interface IStyling{
    hoverColor?: string;
    activeBorderColor?: string;
}
interface ITabHeader extends ITab {
    text?: string;
    icon?: string;
    clickTab: any;
    childIndex: number;
    selectedIndex: number;
}