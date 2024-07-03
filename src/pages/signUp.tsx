import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import SuccessModal from './successModal'

const schema = z
    .object({
        userEmail: z
            .string()
            .min(1, { message: '이메일은 필수입니다.' })
            .email({ message: '이메일 형식이 잘못되었습니다.' }),
        userName: z
            .string()
            .min(1, { message: '이름은 필수입니다.' })
            .max(7, { message: '이름은 7글자 이하로 입력해주세요.' }),
        userPassword: z
            .string()
            .min(1, { message: '비밀번호는 필수입니다.' })
            .max(10, { message: '비밀번호는 10글자 이하로 입력해주세요.' }),
        userPasswordConfirm: z
            .string()
            .min(1, { message: '비밀번호 확인은 필수입니다.' }),
        userAge: z
            .number()
            .min(19, { message: '청소년은 가입이 불가합니다.' })
            .max(100, { message: '나이는 100미만으로 입력해주세요.' }),
        userAddress: z.string().min(1, { message: '주소는 필수입니다.' }),
        userSignUpPath: z.enum(['sns', 'blog', 'friends'], {
            errorMap: () => ({ message: '가입 경로를 선택해주세요.' }),
        }),
    })
    .refine((data) => data.userPassword === data.userPasswordConfirm, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['userPasswordConfirm'],
    })

type SchemaType = z.infer<typeof schema>

export default function HookFormPage() {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SchemaType>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: SchemaType) => {
        console.log(data)
        setIsModalOpen(true)
    }

    return (
        <div className='max-w-md mx-auto mt-10'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            >
                <div className='mb-4'>
                    <label
                        htmlFor='userEmail'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        이메일
                    </label>
                    <input
                        id='userEmail'
                        {...register('userEmail')}
                        type='text'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                    {errors.userEmail && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.userEmail.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='userName'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        이름
                    </label>
                    <input
                        id='userName'
                        {...register('userName')}
                        type='text'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                    {errors.userName && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.userName.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='userPassword'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        비밀번호
                    </label>
                    <input
                        id='userPassword'
                        {...register('userPassword')}
                        type='text' //type='password'로 변경
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                    {errors.userPassword && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.userPassword.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='userPasswordConfirm'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        비밀번호 확인
                    </label>
                    <input
                        id='userPasswordConfirm'
                        {...register('userPasswordConfirm')}
                        type='text' //type='password'로 변경
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                    {errors.userPasswordConfirm && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.userPasswordConfirm.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='userAge'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        나이
                    </label>
                    <input
                        id='userAge'
                        {...register('userAge', { valueAsNumber: true })}
                        type='number'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                    {errors.userAge && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.userAge.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='userAddress'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        주소
                    </label>
                    <input
                        id='userAddress'
                        {...register('userAddress')}
                        type='text'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                    {errors.userAddress && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.userAddress.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='userSignUpPath'
                        className='block text-sm font-medium text-gray-700 mb-1'
                    >
                        가입 경로
                    </label>
                    <select
                        id='userSignUpPath'
                        {...register('userSignUpPath')}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    >
                        <option value=''>선택해주세요</option>
                        <option value='sns'>SNS</option>
                        <option value='blog'>Blog</option>
                        <option value='friends'>Friends</option>
                    </select>
                    {errors.userSignUpPath && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.userSignUpPath.message}
                        </p>
                    )}
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        가입하기
                    </button>
                </div>
            </form>

            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
