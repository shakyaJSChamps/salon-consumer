import SalonDetailsServer from "@/components/salonDetails/salonDetailsServer";

const SalonDetail = ({params}) => {
  const salonid = params.salonid;
  return (
    <div>
      <SalonDetailsServer salonid={salonid}/>
    </div>
  );
}

export default SalonDetail;


