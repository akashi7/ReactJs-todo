import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'whitesmoke',
  },
}

Modal.setAppElement('#root')

// eslint-disable-next-line react/prop-types
const CustomModal = ({ modalIsOpen, closeModal, children }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {children}
      </Modal>
    </div>
  )
}

export default CustomModal
