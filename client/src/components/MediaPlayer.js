import ReactPlayer from "react-player"
const MediaPlayer = (props) => {
    const { stream, height = "200px", width = "200px", userType = "Remote User" } = props;
    return (
        <div className="MediaPlayer">
            <ReactPlayer
                playing
                muted
                height={height}
                width={width}
                url={stream}
            />
            <h5 className="userType">{userType}</h5>
        </div>
    )
}
export default MediaPlayer;