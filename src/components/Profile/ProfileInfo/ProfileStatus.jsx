import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        // setState this is Async method !!!!
        this.setState({ editMode: true });
        // Extra method for rerendering!
        // we should use it not with setState();
        //this.forceUpdate();
    }

    deactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    // Синхронизируем наш Статус
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status })
        }
        console.log("componentDidUpdate")
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Put your status here...'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status} />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;