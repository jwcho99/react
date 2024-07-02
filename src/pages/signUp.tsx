import { format } from 'path'
import { useForm } from 'react-hook-form'

// 이메일, 이름, 비밀번호, 비밀번호 확인, 나이, 주소

export default function HookFormPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/,
                    })}
                    className='border-2 border-black m-4'
                />
                {errors.email && (
                    <p>Email is required or Email 형식이 잘못 되었습니다</p>
                )}
            </div>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    {...register('name', { required: true })}
                    className='border-2 border-black m-4'
                />
                {errors.name && <p>Name is required.</p>}
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    {...register('password', { required: true })}
                    className='border-2 border-black m-4'
                />
                {errors.password && <p>Password is required.</p>}
            </div>
            <div>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    id='confirmPassword'
                    {...register('confirmPassword', {
                        required: true,
                        validate: (value) => value === watch('password'),
                    })}
                    className='border-2 border-black m-4'
                />
                {errors.confirmPassword && <p>비밀번호가 일치하지 않습니다.</p>}
            </div>
            <div>
                <label htmlFor='age'>Age</label>
                <input
                    id='age'
                    {...register('age', {
                        required: true,
                        pattern: /^\d+$/,
                        max: 99,
                        min: 18,
                    })}
                    className='border-2 border-black m-4'
                />
                {errors.age && <p>Age is required.</p>}
            </div>
            <div>
                <label htmlFor='address'>Address</label>
                <input
                    id='address'
                    {...register('address', { required: true })}
                    className='border-2 border-black m-4'
                />
                {errors.address && <p>Address is required.</p>}
            </div>
            <div>
                <label htmlFor='detailAddress'>Detail Address</label>
                <input
                    id='detailAddress'
                    {...register('detailAddress', { required: true })}
                    className='border-2 border-black m-4'
                />
                {errors.detailAddress && <p>Detail Address is required.</p>}
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}
