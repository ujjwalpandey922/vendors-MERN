
type Props = {
  text: string;
  loading?: boolean;
  handleButton:()=>void;
  type?:"submit"|"button"|"reset"
};
const Button = ({ text, handleButton,loading,type }: Props) => {
  return (
    <button
      className="border-none outline-none p-4 w-full cursor-pointer bg-[#1F64FF] text-white rounded-lg hover:bg-[#1f62ffeb]"
      onClick={handleButton}
      disabled={loading}
      type={type || "button"}
    >
      {!loading?text:"Loading...."}
    </button>
  );
};

export default Button;
