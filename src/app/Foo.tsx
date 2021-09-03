import {css} from '@emotion/react'
import {Trans} from '@lingui/react'
import {observer} from 'mobx-react'

@observer
export class Foo extends React.Component {
    render() {
        return (
            <div
                css={css`
                    @media screen and (max-width: 320px) {
                        font-size: 0.75rem;
                    }
                `}
            >
                <button type="button" onClick={this.handleClick}>
                    <Trans>Click</Trans>
                </button>
                <button type="button">
                    <Trans>Click</Trans>
                </button>
            </div>
        )
    }
}
