import { Button } from "@/components/ui/button"
import { paymentData} from './payment.js'
export default function AddToken() {
  
    
    const handlePayment =async(paymentId)=>{
        const stripe = await Stripe
        console.log(stripe)
        // const body ={
        //     product :paymentData[0]
        // }
        // const headers={
        //     "Content-Type":"application/json"
        // }
        // const response = await fetch(`${apiUrl}/create`)
    }
    return (
    <div className="bg-gray-100 dark:bg-gray-900 py-12 h-[92vh] md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Choose the plan that's right for you.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 ">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Basic</h3>
              <p className="text-gray-500 dark:text-gray-400">Perfect for individuals and small teams.</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$9</span>
                <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400"></span>
              </div>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                  100 Token
                </li>
              </ul>
              <Button className="w-full" onClick={()=>handlePayment('7724316f-61cd-42d6-a52b-01b3c0026bea')}>Get started</Button>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="text-gray-500 dark:text-gray-400">Perfect for growing teams and businesses.</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$40</span>
                <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400"></span>
              </div>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                  500 Token
                </li>
                
              </ul>
              <Button className="w-full" onClick={()=>handlePayment('116fb667-eb08-4045-b0c3-04773929dace')}>Get started</Button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
