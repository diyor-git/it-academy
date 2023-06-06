import useComponentVisible from '../../../hooks/useComponentVisible';
import './ActionMenu.scss'

const ActionMenu = ({node}: any) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    return (
        <a className='action' ref={ref} onClick={() => {
            setIsComponentVisible(!isComponentVisible)
        }}>
            <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M16 0C17.1046 0 18 0.895431 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2C14 0.895431 14.8954 0 16 0ZM9 0C10.1046 0 11 0.895431 11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2C7 0.895431 7.89543 0 9 0ZM4 2C4 0.895431 3.10457 0 2 0C0.895432 0 0 0.895431 0 2C0 3.10457 0.895432 4 2 4C3.10457 4 4 3.10457 4 2Z"
                      fill="black"/>
            </svg>
            {isComponentVisible && node}
        </a>
    )
}

export default ActionMenu