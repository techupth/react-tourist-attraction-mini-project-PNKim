import { CopyToClipboard } from "react-copy-to-clipboard";

function CopyClipboard(props) {
  return (
    <CopyToClipboard text={props.url}>
      <button className="w-14 h-14 border rounded-full bg-blue-400 self-end">
        Copy Url
      </button>
    </CopyToClipboard>
  );
}

export default CopyClipboard;
