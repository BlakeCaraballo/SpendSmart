import React from 'react';
import { useForm, useFieldArray,} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import db from "../../db/db"

// Zod schema for validation
const formSchema = z.object({
    month: z.string().nonempty('Month is required'),
  income: z.number().min(1, 'Income must be a positive number'),
  bills: z.array(z.object({
    name: z.string().nonempty('Bill name is required'),
    amount: z.number().min(1, 'Bill amount must be positive')
  })),
  food: z.number().min(0, 'Amount must be at least 0'),
  gas: z.number().min(0, 'Amount must be at least 0'),
  misc: z.number().min(0, 'Amount must be at least 0'),
  subscriptions: z.array(z.object({
    name: z.string().nonempty('Subscription name is required'),
    amount: z.number().min(1, 'Bill amount must be positive')
  })),
  creditCards: z.number().min(0, 'Amount must be at least 0')
});

type FormData = z.infer<typeof formSchema>;

const Form = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    month: '',
    income: 0,
    bills: [{ name: '', amount: 0 }],
    food: 0,
    gas: 0,
    misc: 0,
    subscriptions: [{ name: '', amount: 0 }],
    creditCards: 0
    }
  });

  const { fields: billFields, append: appendBill } = useFieldArray({
    control,
    name: 'bills'
  });

  const { fields: subscriptionFields, append: appendSubscription } = useFieldArray({
    control,
    name: 'subscriptions'
  });

  const handleFormSubmit = async (data: FormData) => {
    await db.charts.add({ month: data.month, data }); // Save form data in IndexedDB
    onSubmit(data);
  };

  const addBill = () => appendBill({ name: '', amount: 0 });
  const addSubscription = () => appendSubscription({ name: '', amount: 0 });

  return (
    <section id='form' className='dark:bg-gradient-to-b from-gray-900 to-black'>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 bg-gray-100 dark:bg-black max-w-lg mx-auto rounded-xl">
        {/* Month and Income Inputs Side by Side */}
        <div className="flex flex-wrap mb-4">
          <div className="w-full sm:w-1/2 pr-2">
            <label>Month🗓️</label>
            <select {...register('month')} className="p-2 w-full dark:bg-black rounded-full dark: text-white">
              <option value="">Select a Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {errors.month && <p className="text-red-500">{errors.month.message}</p>}
          </div>

          <div className="w-full sm:w-1/2 pl-2 ">
            <label>Income💰</label>
            <input
              type="number"
              {...register('income', { valueAsNumber: true })}
              className="p-2 w-full dark:bg-gradient-to-b from-gray-900 to-black dark:text-white rounded-full"
            />
            {errors.income && <p className="text-red-500">{errors.income.message}</p>}
          </div>
        </div>

        {/* Recurring Bills */}
        {billFields.map((bill, index) => (
          <div key={bill.id} className="flex mb-4">
            <div className="w-full sm:w-1/2 pr-2">
              <label>Bill Name💵</label>
              <input
                {...register(`bills.${index}.name`)}
                className="p-2 w-full mb-2 dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
              />
              {errors.bills?.[index]?.name && <p className="text-red-500">{errors.bills[index]?.name?.message}</p>}
            </div>

            <div className="w-full sm:w-1/2 pl-2">
              <label>Bill Amount💷</label>
              <input
                type="number"
                {...register(`bills.${index}.amount`, { valueAsNumber: true })}
                className="p-2 w-full dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
              />
              {errors.bills?.[index]?.amount && <p className="text-red-500">{errors.bills[index]?.amount?.message}</p>}
            </div>
          </div>
        ))}

              <button 
                type="button" 
                onClick={addBill} 
                className="bg-gradient-to-b from-gray-900 to-black text-white p-2 mb-4 rounded-full"
              >
                Add Bill
              </button>

        {/* Other Expenses Side by Side */}
        <div className="flex flex-wrap mb-4">
          <div className="w-full sm:w-1/3 pr-2">
            <label>Food/Grocery🍉</label>
            <input
              type="number"
              {...register('food', { valueAsNumber: true })}
              className="p-2 w-full dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
            />
            {errors.food && <p className="text-red-500">{errors.food.message}</p>}
          </div>

          <div className="w-full sm:w-1/3 pr-2">
            <label>Gas🚗</label>
            <input
              type="number"
              {...register('gas', { valueAsNumber: true })}
              className="p-2 w-full dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
            />
            {errors.gas && <p className="text-red-500">{errors.gas.message}</p>}
          </div>

          <div className="w-full sm:w-1/3 pl-2">
            <label>Misc Expenses🍿</label>
            <input
              type="number"
              {...register('misc', { valueAsNumber: true })}
              className="p-2 w-full dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
            />
            {errors.misc && <p className="text-red-500">{errors.misc.message}</p>}
          </div>
        </div>

        {/* Subscriptions */}
        {subscriptionFields.map((subscription, index) => (
          <div key={subscription.id} className="flex mb-4">
            <div className="w-full sm:w-1/2 pr-2">
              <label>Subscription Name 🤑</label>
              <input
                {...register(`subscriptions.${index}.name`)}
                className="p-2 w-full mb-2 dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
              />
              {errors.subscriptions?.[index]?.name && <p className="text-red-500">{errors.subscriptions[index]?.name?.message}</p>}
            </div>

            <div className="w-full sm:w-1/2 pl-2">
              <label>Subscription Amount💶</label>
              <input
                type="number"
                {...register(`subscriptions.${index}.amount`, { valueAsNumber: true })}
                className="p-2 w-full dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
              />
              {errors.subscriptions?.[index]?.amount && <p className="text-red-500">{errors.subscriptions[index]?.amount?.message}</p>}
            </div>
          </div>
        ))}

        <button type="button" onClick={addSubscription} className="bg-gradient-to-b from-gray-900 to-black text-white p-2 mb-4 rounded-full">
          Add Subscription
        </button>

        {/* Credit Cards */}
        <div className="mb-4">
          <label>Credit Cards💳</label>
          <input
            type="number"
            {...register('creditCards', { valueAsNumber: true })}
            className="p-2 w-full dark:bg-gradient-to-b from-gray-900 to-black text-white rounded-full"
          />
          {errors.creditCards && <p className="text-red-500">{errors.creditCards.message}</p>}
        </div>

        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded-full">
          Submit
        </button>
      </form>
    </section>
  );
};


export default Form;