import styles from './payment.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function PaymentPage() {
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
        <div className={styles.serviceType}>
            <h3>Grooming Essentials</h3>
            <div className={styles.price}>
                <div className={styles.count}>
                    <RemoveIcon className={styles.countIcon} />
                    <span>1</span>
                    <AddIcon className={styles.countIcon} />
                </div>
                <div className={styles.price}>₹499</div>
            </div>
        </div>
        <div className={styles.serviceList}>
            <ul>
                <li>Haircut for men x1 </li>
                <li>10 min Relaxing Head massage x1</li>
                <li> Beard trimming & styling x1</li>
            </ul>
            <button>Edit items</button>
        </div>
        <div className={styles.offers}>
            <h3>Coupons and offers</h3>
            <div className={styles.offerlist}>
                <ul>
                    <li>Flat 20% off On Payment Through Axis Bank</li>
                    <li>Flat 20% off On Payment Through Axis Bank</li>
                </ul>
            </div>
        </div>
        <div className={styles.paymentSummary}>
            <h3>Payment summary</h3>
            <div className={styles.total}>
                <h4>Item Total</h4>
                <span>499</span>
            </div>
            <div className={styles.tax}>
                <h4>Taxes and Fee</h4>
                <span>49</span>
            </div>
            <hr className={styles.hr} />
            <div className={styles.grandTotal}>
                <h4>Total</h4>
                <span>548</span>
            </div>
        </div>
    </div>
    <div className={styles.payment}>
        <button>Confirm Payment</button>
    </div>
</div>
  )
}

export default PaymentPage
