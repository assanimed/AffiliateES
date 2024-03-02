import { forwardRef, useEffect, useRef } from 'react';


export default forwardRef(function TextInput({ type = 'text', Icon = null, className = '', label = "", isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex bg-white items-center gap-2 shadow-md py-1 px-3 rounded">
            <div>
                {Icon}
            </div>
            {/* <input
                {...props}
                type={type}
                className={
                    'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pl-[50px] rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            /> */}

            <input {...props} type={type} ref={input} placeholder={label} className="flex-1 border-none focus:outline-none outline-none border-transparent focus:border-transparent focus:ring-0"/>
        </div>
    );
});
