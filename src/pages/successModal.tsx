import React from 'react'

interface SuccessModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    if (!isOpen) return null

    return (
        <div
            className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
            id='my-modal'
        >
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                <div className='mt-3 text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                        성공!
                    </h3>
                    <div className='mt-2 px-7 py-3'>
                        <p className='text-sm text-gray-500'>
                            폼이 성공적으로 제출되었습니다.
                        </p>
                    </div>
                    <div className='items-center px-4 py-3'>
                        <button
                            id='ok-btn'
                            className='px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
                            onClick={onClose}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
