export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="
        w-full h-9 px-3 text-sm
        border border-slate-300 rounded-lg
        bg-white
        focus:ring-2 focus:ring-slate-200
        outline-none
      "
        />
    );
}