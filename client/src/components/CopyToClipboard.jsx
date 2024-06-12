import { CopyToClipboard } from "react-copy-to-clipboard";

function CopyClipboard(props) {
  let url = props.url;
  return (
    <CopyToClipboard text={url}>
      <button className="w-14 h-14 border rounded-full self-end bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnZPATKdhkHywoJkkV_MRo_DFrC7cPJjQ-kopunaEZhEPYYNPN3IfekJ-2GQhUi9R2S78&usqp=CAU')] bg-cover"></button>
    </CopyToClipboard>
  );
}

export default CopyClipboard;
