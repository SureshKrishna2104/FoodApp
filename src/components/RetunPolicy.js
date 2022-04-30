import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const ReturnPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
       <Text style={{fontWeight:'bold',fontSize:20}}>Refund and Return Policy </Text> 
       {"\n"} {"\n"}<Text style={{fontWeight:'bold',fontSize:20}}>Cancellation </Text>{"\n"}As a general rule you shall not be
        entitled to cancel your order once you have received confirmation of the
        same. Cancellation of order can be done for Cash on Delivery order if
        the order is not processed from "ThreeSixty " . For online payment
        cancellation of order is not allowed.{"\n"} "ThreeSixty" has the right to
        cancel order in such case full refund will be done from the website to
        the payment method used while placing the order for online
        payments. However, in the unlikely event of an item on your order being
        unavailable, we will contact you on the phone number provided to us at
        the time of placing the order and inform you of such unavailability. In
        such an event you will be entitled to cancel the entire order and shall
        be entitled to a refund in accordance with our refund policy.{"\n"} We reserve
        the sole right to cancel your order in the following circumstance:{"\n"} • in
        the event of the designated address falls outside the delivery zone
        offered by us;{"\n"} • failure to contact you by phone or email at the time of
        confirming the order booking;{"\n"} • failure to deliver your order due to
        lack of information, direction or authorization from you at the time of
        delivery; or{"\n"} • unavailability of all the items ordered by you at the
        time of booking the order; or{"\n"} • unavailability of all the items ordered
        by you at the time of booking the order; or{"\n"}{"\n"}<Text style={{fontWeight:'bold',fontSize:20}}> Refunds</Text> {"\n"}You shall be
        entitled to a refund only if you pre-pay for your order at the time of
        placing your order on the Platform and only in the event of any of the
        following circumstances:{"\n"} your order packaging has been tampered or
        damaged at the time of delivery;{"\n"} • us cancelling your order due to {"\n"}(A)
        your delivery location following outside our designated delivery zones;{"\n"}
        (B) failure to contact you by phone or email at the time of confirming
        the order booking; or {"\n"}(C) failure to contact you by phone or email at
        the time of confirming the order booking; or • you cancelling the order
        at the time of confirmation due to unavailability of the items you
        ordered for at the time of booking. Our decision on refunds shall be at
        our sole discretion and shall be final and binding.
      </Text>
    </ScrollView>
  );
};

export default ReturnPolicy;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    //  margin:2,
    // paddingLeft:2,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 17,
    padding: 2,
    margin: 2,
    paddingLeft: 20,
  },
});
