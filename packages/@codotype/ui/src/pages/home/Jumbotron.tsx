import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { PluginCard } from "../../components/PluginCard";
import { PluginMetadata } from "@codotype/core";
import { GitHubStar } from "../../components/GitHubStar";

// // // //

/**
 * Jumbotron
 */
export function Jumbotron(props: {
    title: string;
    subtitle: string;
    body: string;
    plugins: PluginMetadata[];
    children: React.ReactNode;
}) {
    const { title, subtitle, body, plugins } = props;

    return (
        <div>
            <div className="container">
                <div className="row items-center">
                    <div className="col-12 col-md-5">
                        <h1 className="text-6xl">{title}</h1>

                        <h1 className="text-3xl leading-6">{subtitle}</h1>

                        <p className="text-gray-600 my-3 text-lg">{body}</p>

                        <div className="row py-2">
                            <div className="col-lg-12 flex flex-column">
                                {props.children}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-7 my-3 my-md-5 py-md-4">
                        <div className="card-deck">
                            {plugins.map(g => (
                                <PluginCard key={g.identifier} plugin={g} />
                            ))}
                        </div>

                        <div className="row mt-4 flex justify-center">
                            <div className="col-lg-6">
                                <a
                                    href="/plugins"
                                    className="btn btn-block btn-lg btn-outline-primary rounded-pill"
                                >
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="mr-1"
                                    />
                                    Browse Plugins
                                </a>
                            </div>
                        </div>
                        {/* <!-- <div */}
                        {/* className="youtube cast-shadow" */}
                        {/* data-video-id="rm5sdAYCqqc" */}
                        {/* data-params="modestbranding=1&amp;showinfo=0&amp;controls=1&amp;vq=hd720" */}
                        {/* > */}
                        {/* <img */}
                        {/* src="~assets/images/codotype-dashboard-01.png" */}
                        {/* alt="image" */}
                        {/* className="img-fluid" */}
                        {/* /> */}
                        {/* <div className="play"> */}
                        {/* <span className="pe-7s-play pe-3x"></span> */}
                        {/* </div> */}
                        {/* </div> --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

// /*-----------------------------------
//  * YOUTUBE VIDEO SCSS
//  *-----------------------------------*/

//     iframe
//       display: block

//     .youtube
//       background-position: center
//       background-repeat: no-repeat
//       position: relative
//       overflow: hidden
//       transition: all 200ms ease-out
//       cursor: pointer

//     .youtube .play
//       background: #fff
//       border-radius: 50%
//       width: 80px
//       height: 80px
//       position: absolute
//       top: 50%
//       left: 50%
//       transform: translate(-50%, -50%)
//       box-shadow: 0px 9px 68px 0px rgba(62, 57, 107, 0.2)
//       text-align: center
//       padding: 17px 20px
//       span
//         color: $blue

//     .bg-video video
//       position: absolute
//       top: 50%
//       left: 50%
//       min-width: 100%
//       min-height: 100%
//       width: auto
//       height: auto
//       transform: translateX(-50%) translateY(-50%)
//       // background: url('../images/agency/poster.jpg') no-repeat
//       background-size: cover
//       transition: 1s opacity

//     .bg-video.align-bottom video
//       top: auto
//       bottom: 0
//       transform: translateX(-50%) translateY(0)
