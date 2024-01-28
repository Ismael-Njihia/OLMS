import {Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ReadOnlineSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {
                step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Sign In</Nav.Link>
                )
            }

        </Nav.Item>

        <Nav.Item>
            {
                step2 ? (
                    <LinkContainer to='/duration'>
                        <Nav.Link>Select Duration</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Select Duration</Nav.Link>
                )
            }
        </Nav.Item>

        <Nav.Item>
            {
                step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Make Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Make Payment</Nav.Link>
                )
            }
        </Nav.Item>

        <Nav.Item>
            {
                step4 ? (
                    <LinkContainer to='/read'>
                        <Nav.Link>Read Online</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Read Online</Nav.Link>
                )
            }
        </Nav.Item>
        
    </Nav>
  )
}

export default ReadOnlineSteps