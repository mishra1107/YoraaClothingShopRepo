import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const collections = [
  {
    id: '1',
    title: "Men's",
    subtitle: 'COLLECTION',
    image: 'https://images.pexels.com/photos/8386649/pexels-photo-8386649.jpeg?auto=compress&cs=tinysrgb&w=400', 
  },
  {
    id: '2',
    title: "Women's",
    subtitle: 'COLLECTION',
    image: 'data:image/jpeg;base64,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', // Women's collection image
  },


  {
    id: '3',
    title: "Kid's",
    subtitle: 'COLLECTION',
    image: 'https://images.pexels.com/photos/8386649/pexels-photo-8386649.jpeg?auto=compress&cs=tinysrgb&w=400', 
  },
  {
    id: '4',
    title: "Ethic",
    subtitle: 'COLLECTION',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA0wMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBQYHBAj/xAA/EAABAwMBBQUGAwUHBQAAAAABAAIDBAURIQYSMUFRBxMiYXEUMoGRobEjQsFScoLR4RUkMzRDovBTYrLi8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACkRAAICAgIBAwIHAQAAAAAAAAABAhEDIRIxQQQiMhNhIzNCQ4GR0QX/2gAMAwEAAhEDEQA/ANNwm5IGyAh7QU6gsSiLkt7mO3qWQsPTOiJtbPTnFVGS39tqlCEh0bSNRkdCmTQ3DVxzAbrwuhQ9xoWtYZYSWPbqMKQoXufTsc/jhJhY/wA0aGEaCkJckpTuCZkLvypALL8c006XoMpO4T7xSg1ACfG/3jogGBOYQTQBAIYRoIAQ4ZVbJ9m2pbnQTx4+IP8AVWU8FW9p2mCakrWjWKUbx8joqh3RE+rLM1OMOHBMwOD42uGuicCkockGuibTjtWgppJDDKCJBMA0aSjQASCGUEAPFBBBAAQKCGMoAYqGb8Zb1S4W7jA0ck6Qk8ECoUEE2yeNxIDhnonEDQbdXJmXj8U833kzJx+KXkBCCCCYAQQJTM9TFAMyyNYOrjhADyJMw1UM4zDMyTruuBTwOUAAqMv1N7VbZ2cSWnCk+SblblhTXYmrOLZyf2i1wvJ8QaAfVSirmzLu5qa2jP8Apykj0OqsacuxQdocZq3CaKXE7XdROGCVBQlBJKNUAaGUSCQAQRIICzoRokXFAB8UpENECUAGTomnapRKThICJuUJpZI6mE4w4b46hSsT95jXdQuS7tBo3eSfpDmnj9E/BPk6WcU1L76dYdU1N76Xkob5oZ0RIjwTAr2220sezVnNVuiSokd3cEZ4OdxyfIAE/RZVado6qruUtZdqyR+GnxHgD0A5DipntqlkNfbIsfh9093xyFWtiqOjqLo2a5nNJEQQw6B7+WfJU17LKx/Ivdl2Odc3x3W3z1dvJG8yUOwXHrjnlXuhNVTv9jr395K1ocybAHeD0HNcVt2xsUbnU8lfTN7seJxnjLWepDjhRt47QbE2beinbUtgdnNOd8kEYOvD5ZXPHm2joyKJbERXFZrnDeLdBX0zJGRTDLRI3ddxxw+C7Stjksrjnex7Tsd+Wojx/EFZwcj1VY2pBh9lrBp3UoJPkdFYoHh8TXDmFUukyY9tDrPeTko5ppp1TzhmMFQWMlEjKIpgGiJQRFAAyiRYRoEdSAQKSSlYxRKLKSOKMpAGiRZRByYHNdBmjk9EuhOaaM+SRcjmkl/dXNBcaSkt8M1XUxQxHwh73AAnoPNUlol9kq06hIqPfQY8O3SOBRVJ8anyUNIHgiykueAMu4JgZ72u2mSrtlNcImOeaR+JA3XDHfm+BA+fksshg9p/DeRh2jRwaOi1bajtFtNH3tHSRG4yateGnEfoXc/hlZza6unNaKhsDY2CUubEH5DOgBK0TfEvGk5JMk7TsNc6prJo4pGxNeN8uG7ludQM43tOit9VsG243CK608cVPvtaainc9p3HjpjI1H115qcpK2jvFnNKKowueBndI3sfqFH7TSw7IbM189HWf32sDIoi0BuD1AHQZK5FlnKVHpcMUYOXTLbaqRlvoIKSM5bE3dzjiu3Kxyw9qFZSubFeYhVQZ/xmDdkaPTg76FanaLpSXehZWUMolgfoHcNeY9V0NUeU1sRtBTiqts0eMktOEnZiqNXaYXuOXBuD6qQlbvsc3qFXtlH+z1VbRO07uUlo8jqmtxIepFpAT0RyCCmMnCXG7DslSyxLhgpJTkmOqbyhAGEEnKBKADRIso0AdBKJABNVVVDSQmapmZFGOLnuACQ0m3SHs4SJHtY0ueQGt1JJwAFTLvt5TxOdFaYDUP8A+rId1nw5n6LP79tXNXuLa2pdUHOWwtOGNP2Wf1L1DZ6eP/lzUfqZ5KEfv3/RpV422t9CHMpM1kw/ZOGfF38sqk1HaPXRXGKbvWva14DqeJvgxzyeJ+aor6mquNQymiY57pHhkcMY99xOg8ytZtnZnZ6XZxsG0Em7cqpw/GjdgxP5MZ1xzzxKpY33N/whS9T6fEnD08L+8v8APB1X+/TXXZiSWwzMdNOREGReORmeJP7OBk59DoqRdbAaG0VE15uM1RNHE5sMAfuwxuwDga6nPT5FdMuz952crP7NkqHPtzJWztmjaAJTvNDWnn75BIOgweqpzny3y5S1c8kkhe87r3AkMbyGeWnL1WkbbpdHFNwgtLZqPZNtFU3Cnfa60mV1M3MEuckszjB9OS0Ko94eiyTs1lgo9qvZGuDjJTOG9nUEFpx91rdScYTn2YLoYJAWe9rN/lo6OC10sha+qy6ZzePdjTd+J+y7Nvds5NnXwUlBHFJVStL395wjaOGg5k/ZZJertW3msNZcJA+ZzQ3wtwABwACIopX2NSRCWMdQPCrXs7brDdaZjWMrKes3d2XdcDEXfxcD5AqrUj25aXkhoIyRyHNbFs/sgy0s3rfdq5rXgEjLAD/tSnKkdnFSqZE1GxtvtVtnr56m5yNpozI6AysY2QjkN0ZGfVZfcqyavrJamfQvcSGBxIYOgzy4LZe0K01tZs7KylqZHNixI+F2Hd4Bx104cVib2kE8+eiMO1Zl6h7SEA64XoXYi3/2Vs1b6V4w8RB8n7zvEfusFt+Yp46jcY/unteGP1DsHOCOmi0u0dqLTK2K6W4MY7jLTvJx/AeXxVyMo4pOOjTSoCkp3DaaaWP3TGA4+eVKUVZDcaKOropBJDK3eY4c09TU7Ii5353cSpToya2dbeCIogdFx3S50lspXVNfURwQt4vecfD1S7GdTzokjKzyo7UaEXCJsVJUGgOQ+d7ME+bRnOB5jXyV4tdwp7nQw1lG/vIJmhzHYwSPTkhqgs7AlJJcBqSAg17XDwuBSGGggggDozgaqldod7tUVufb6idr6x7mlkTRvFpB4u6BXSVgkY5rs4cMHBwfnyWGbVbNGz3R8Lw54kJfHNze3z8+qFFS7Lx5JYpqcHtDM9rqKzw+0N7pwJDIeflnzUfPT2yic1jWPqZnYDYm6kk8Af5cVxTXKpERp4pjHE1xaXtPid8VqnZpsKbdBHfbtFisc3epYXDPcg/nP/efoPNVGKitFZvUTzy5TdskuzvYkWdgu93jjFye093GBpSM6fvY4n4LmvVznud3pKmle5sXtjaShx+Y5/Fk+ADh8PJaF3TailfFUDfbIN0g6ZCTFYrWTTH2GIGlGIMad3pjTppn5qXbTIhJXbMx7Q7p3DpqURvMjqZ8wlJyA5owG/NzfmsrjpaitErqNhMcbC+WMOwIw0akjnoFsXavZZ2WmWrpKd9QBneLRlzGuc3J9PANfJZHYnB13g3DiObLH+LRzcEkH1xhTgTUdm2SpMk7XXOg2gtXs2+HxVcTN0buDlwa7XlkEjgt0vVZFQUU1XUHEUEbnv8AQBefLFWVFJdqKqpmNfUslaWMfwc4nGD048eS0Ttgvoioqey00gEtR46loOS2MYwD6n6ArR22RkxKFUZbda+oulwmr6t341Q8ucM+6OQ+A0+C5pOXolGMaDCTKAMY481aJlFpAjkLNMZaeLeq2rs+v4vFtZBI7NTTNDXO4b7eAdjryI6rGO7aWDTVW3smdKzbARszuOppN8ctMY+qzyRTia43KNJ9F07Q9pH22F1rZBve0wEOkc4jAOmmOayGRhc7eLite7UbO6ttHtsDAZaUZI5ludVkbjnGE4NcdGjim9hReKQg8xgeSSCe9S2DBykyaVJA9VQq4pGu9kNd31nq6FzhvU028wdGP1/8g5X4LHOyasEO0b4dcVFO5p9WkEfqtedIOWp5LNmGZVMRcK6nt9HLVVkrYoIm7z3u5BYZt3tMdoruXwl/9n0x3YI5ODur8cs/b1Uz2qbSOrqptopZQaWHxVBYc7z86D4Y+areztmud29pfbKWOp9lDS+NzwPeyBjPHgVoqirZmot9D9ntL663XFkDZm1UMXtEUDzlkjGkB7fXDshXrssqaiOzmlrCWM74th3tN3o0jlw0+Sh7VZq213OKvuVW9ru6MkzZHbsbd7/T11J4DhjXCmKe42WipY7PUTONfvPMRhcCY2E5bl2cAY3dDzGcA6pN30VwqPJl8kp2yxlriSDxVPvclZsvVx10Er5aBzw2aNx9zPMFSVFd60Rwiplhk3QA9zGEF/ml7TU4u9I2ghO8ZiN7ybzShp0zGfWidp6iOaBkodo9oIQSKalEFPHE3GGNACCRdEkSoPauyMvtqfT5a2obl0EhHuO/lyKmGyseMtcCovayufbtn6uqiduSYDY3ebjhEVugb0YTQUFTbbi51awxz08pAjyDuuB45+y1HYC8V10vBgqKyomjZA+RzZJXOB1A1B9VnEznzPJGXOcdSTx9Vo/ZHTNjra52hlFO0Oz5u/8AVds4KMDljNymaTAcjd6J9j8adU0wbrz0wiDsygcsLiOse3Q4ajPhwvOm2NGaDbqsp3e7HVse3I/K4736lejmgYWI9tNGabayKsAw2rpWkEDi5hII+WPmnE6PT1z2Z28d1M5ufceQfgf6IXOvnulzqa6rcXTTvLnHp0A8hwRTyGWd73Abz3Fxx1OqZxvb2dDywqXRrkVsEgxueqYd4pPJPyteIo5XMcIyS0OxoXDGR9R81zs456JowySuVI6W8gOK1ns42cNqpTcKtu7WVI0BOsbOnqdD8lTdgaKlqbwPamh8kbN9jDwB5ErYYG5aMBY5JeDdU0MXx7XWuqD/AHe5fvZ6YK8907t6Fh46LcduZH0uyt0k1BMBjHq7wj7rDYDq5vIKsS9pF1kSHwm5v8yfROt10TMn+YKtF5Okdlruklorae4QEl9O8PLc+8OY+Iytd252nprNa+6jmkbV1kbhTmFoJbp7xJ4DVYi7JGOZCdnqZqoh1RK+VzWtYHOPBo4D4I4nLP3MZz+EOv6q97J3aq2X2KqbpSU0cxqa5sTjJnDBunB046j6qjRRmaZsbSANcuJwAOZWrU9pZN2R1UbA5wdD7RHniXNO9n4kKMjWkwjtujP62/1t1qqqquE3eSThvu5DWgDADQeA/qo61v7uqYBoc5aeh/rw+KaiaXDIGiQTuvBacFpyFtS8Gbk32agyudTU8UneAZZvAFWHYzaGluVVPT7m7ODhryffGOX1WR1d7fUbo8Qa1gaBny1+uU5Z72+irInMZugPB3wdQeqniSeiMjqEFAUG1ltmo4pJ52xyub4m44FBZ0VZNPo25zG5zD5KG2lgrpbNPT937VHkSMGPEwg6nHMYz6KylJIyNU06diaswupcKVhlkfvYyQcD4BXjsNc+oF4qpHFznSxsz0AaTj6rr2t2Epr4DLSTPpKgu3tBmN56lvHPmPkpDsp2drNnbZXU9e2Pfkqd9r43bwc3dABW+TKpxozx4+LLvUDdbvD0TVL4pjnkE7Md+MjphJpB+JIegC5zbydgGAs97Y7I64bPR18WS+gl7wgDiwjDv5/BaImpo2SxvjkY17HtLXNcMgg8QhMtOnZ5HmG47B01wCU2ctGV6dt+yNhtE76mlt8Ye7Uuf490dBngvPW0VDuNlljBJyTp5q47NMmW9o69tA2GzbMUoAaRROlcAMau3dfoq3RMa6QveMsYM46nkFJbWXRtyuMbY4yyKkhbTMBOc7mhPoVwUo/u5wcZf+n9UzPFHlk2WTs7Y99/fKScjOT11W20mCzksVsW0lJQTmRls7snG93T+JHPUc1oNq26tcrAJmVEJ82Z+y58kZPaOiEopVYrtSfubJ1A/bkY3/dn9FiEJ/EI6rVu06+W+v2cZHR1TZHmoaSzBBAweqyaPSULXEmobMskl9RUdgTczcVTgljgUVRkTl2niaHD5Jo3ydI5QdR6IA7oKntoNlqu009PXRfjUFQxrmS5ALXEZ3SFBBuSCdR0CtK+jiboJvh54ceC0uh2+paTZuntP9nSSNbSiB7u8xk7uCR8dVm0LHSzBoaXOwTjyCtdBsddK2iMsLYi/P8Ahl+DjqpmofqCHNbiV6oDIYQ2MY5arg9VN7RWS4WaSJlxh7vvW5YQ7OVCq9Vol3ewkEEEgJOnuk0cLGb50CCjEFViPVZSSjKJc5YOSdZVmCPDYnvPElpH6pkptzj+VMATbQQw5ElHWjn4YC4fTKcodprS9zmumfC84z3sZb/z6JpjN05J1Snhsn+I1r/3hlFgT1PVwVMe9TzRSt6xvDvsnSVUn0FG5+/7Oxr/ANpnhI+ITzGzRY7mtqmAcBvh4/3AoCycuT9ygqX/ALMLz9CvOe0JPsL3DqPutruT7lV2+opGVcA76Mx77oDvNyME6OA+ixbbq1VVgip6apqYJ/aXOcDG0ggNxnOfMhXHoPJTnkl2SfNdFKcRH94Y+X/xc7/eyn6Y5jcOjgf+fIJvovH+YjuphrrF8RrlS9M5jGag/LCjqQjIPMjUKYgOAOYTIfbIvaJ29SR7pyN/XUdFAMPjb6qxbRgewtIP+oP1Vcb7w9UhL5I7eqS/UQu5Fv2JH6BGdRoiLswRDkJHj6MP6qTum9o3nY0R1myVsMzGP/AaCHNBGRou2p2dtFSMT2ykf6whQnZXP3+yUDTxilkZ8N4kfQq2VEzYYy95wAEra6OPIvcyjbW7O2m2WvvKC3wxPfKN98bdWswcn7Bd9tZ7JQGZum43KO7d9W1lOZMiNzHeHyJH8lXdtdqjaaY0NFj2qRvi3m6NauXLc58UdOFqGPkyL7Wq0VVRbmNILREXZHnhZ7hdFXWVFY/fqZTIQMAnkEz+Qnou/FDjHizkyTTdobQSnt3SkookCCCCAPVSS4oILAsaeSUpoAQQQINyTlBBAxJREoIIJErH+2R7jtBRMJ8LaTIHq85+wQQVR7AomMloXXBTsBdgu1H6oIK2aR+aJKCINDcEqTijG6NSgggmXZHX5u/BGHOOC/8ARQ7Kdm+NXIIIEuxyZgj0blFwpPScfVv9Aggkdb8GsdjznGxVrCfC2sIA/gYVapf7zchFKSWM4NQQUnLm+TDubRvxuwMgYGnDis127s9NJBVXJ5lNQzAb4vCNQOCCC5IP8ZnZ+yZ0OKPfdnCCC9FHnhv8UYeeIdhNoIIfZSAgggkI/9k=', // Women's collection image
  },

  {
    id: '5',
    title: "Men's",
    subtitle: 'COLLECTION',
    image: 'https://images.pexels.com/photos/8386649/pexels-photo-8386649.jpeg?auto=compress&cs=tinysrgb&w=400', 
  },
  {
    id: '6',
    title: "Women's",
    subtitle: 'COLLECTION',
    image: 'data:image/jpeg;base64,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', // Women's collection image
  },

];

const CollectionScreen = () => {
  const navigation=useNavigation();
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() =>('Profile')}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={collections}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden', // Ensures rounded corners for ImageBackground
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageBackground: {
    height: 250, // Card height
    width: width - 32, // Full width with padding
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 8,
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default CollectionScreen;
