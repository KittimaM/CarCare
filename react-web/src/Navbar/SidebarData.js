import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
//import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Queue' ,
        path: '/queue' ,
        icon: <AiIcons.AiFillCar/> ,
        cName: 'nav-text'
    },
    {
        title: 'Customer' ,
        path: '/customer' ,
        icon: <FaIcons.FaDiagnoses/> ,
        cName: 'nav-text'
    },
    {
        title: 'Time Stamp' ,
        path: '/timestamp' ,
        icon: <AiIcons.AiOutlineFieldTime/> ,
        cName: 'nav-text'
    },
    {
        title: 'Promotion ' ,
        path: '/promotion' ,
        icon: <AiIcons.AiOutlinePaperClip/> ,
        cName: 'nav-text'
    },
    {
        title: 'Employee Schedule ' ,
        path: '/emploree' ,
        icon: <FaIcons.FaUserEdit/> ,
        cName: 'nav-text'
    }
]
