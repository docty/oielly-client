import { style } from 'typestyle';


 

export const cartCount = style({
    right: '-13px',
    width: '20px',
    height: '20px',
    lineHeight: '12px',
    top: '0',
    borderRadius: '50%',
    padding: '3px'
})

 
export const categoryBox = style({
    borderRadius: '8px',
    $nest: {
        "&+h4": {
            background: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '0.5rem',
            position:'relative',
            bottom: '3rem',
            margin: '0 1rem',
            borderRadius: '4px',
            $nest: {
                "&:hover":{
                     
                    color: '#fff'
                }
            }
        }
    }
})

// **************  MOBILE VIEW *******************************/
export const mobileWrapper = style({
    position: 'fixed',
    background: '#222',
    top: '0',
    bottom: '0',
    zIndex: 1000,
    transition: 'left 0.5s'
})

export const menutItem = style({
    $nest: {
        "&:hover" : {
            $nest: {
                "&>ul" : {
                    visibility: 'visible'
                }
            }
        }
    }
})