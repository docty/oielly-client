import { HTMLAttributes, ReactNode } from 'react'
import { style } from 'typestyle'
import classnames from 'classnames';

const Modal = (props: IModal) => {
	if (props.isOpen) {
		return (
			<div className={'fixed inset-0 flex justify-center items-center ' + modalWrapper} id={props.id}>
				<div className={classnames(['bg-white relative rounded mt-0 -top-10 p-4 ', modelContainer, props.className])}>
					<i className={['icon-cross text-black', iconCross].join(' ')} onClick={props.setOpen}></i>
					<h5 className={'font-bold text-base mb-3 mr-5 text-black'} style={props.style}>{props.title}</h5>
					{props.children}
				</div>
			</div>
		)
	} else { return <></> }
};

const modalWrapper = style({
	background: 'rgba(0,0,0,0.8)',
	zIndex: 5
})

const modelContainer = style({
	minWidth: '350px',
	maxWidth: '500px',

});

const iconCross = style({
	position: 'absolute',
	right: '10px',
	top: '16px',
	fontSize: '1.3rem',
	cursor: 'pointer',
})

interface IModal extends Pick<HTMLAttributes<ReactNode>, 'children' | 'className' | 'style' | 'id'> {
	title?: string;
	isOpen?: boolean;
	setOpen?: () => void
}
export default Modal;
