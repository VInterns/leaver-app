import React, { Component } from 'react';
import DropzoneComponent from "react-dropzone-component";

export class ImageUploaderComponent extends Component {
    constructor() {
        super();
        this.state = {
            attachments: []
        }
    }

    props: {
        fileAddHandler: (file) => void
    }
    dropzone: any = null;

    get dropZoneConfig() {
        return {
            postUrl: `/api/resignations/uploadhandler/`,
            iconFiletypes: [".jpg", ".png", "gif"],
            showFiletypeIcon: true
        };
    }

    get dropZonedJsConfig() {
        return {
            autoProcessQueue: true,
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif"
        };
    }

    get dropZoneEventHandlers() {
        return {
            init: (dz: any) => {
                this.dropzone = dz;
                // this.dropzone.files = this.state.attachments;
                if (this.state.attachments.length > 0)
                    this.state.attachments.forEach(attachment => {
                        this.dropzone.emit("addedfile", attachment);
                        this.dropzone.emit("thumbnail", attachment, attachment.dataURL);
                        this.dropzone.emit("complete", attachment);
                        this.dropzone.emit("success", attachment);
                    });
                // this.dropzone.options.maxFiles =
                //   this.dropzone.options.maxFiles - this.state.attachments.length;
                // this.dropzone.files = this.state.attachments;
            },
            addedfile: (file: any) => { },
            success: (file: any) => {
                let attachments: Array<any> = this.state.attachments
                    ? this.state.attachments
                    : [];
                this.setState({
                    attachments: [
                        ...attachments,
                        {
                            fileName: file.name,
                            dataURL: file.dataURL,
                            type: file.type,
                            size: file.size
                        }
                    ]
                });
                this.props.fileAddHandler(file);
            },
            removedfile: (file: any) => {
                const attachments: Array<any> = this.state.attachments.filter(
                    attachment => attachment.fileName !== file.fileName
                );
                this.setState({
                    attachments: [...attachments]
                });
            }
        };
    }

    render() {
        return (
            <DropzoneComponent
                config={this.dropZoneConfig}
                eventHandlers={this.dropZoneEventHandlers}
                djsConfig={this.dropZonedJsConfig}
            />
        )
    }
}