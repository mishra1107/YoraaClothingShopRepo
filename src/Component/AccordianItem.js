import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Accordion Header */}
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={expanded ? 'minus' : 'plus'} size={20} color="black" />
      </TouchableOpacity>

      {/* Accordion Content (Only visible when expanded) */}
      {expanded && (
        <View style={styles.content}>
          {/* Checking if the content includes bullet points */}
          {title === 'DESCRIPTION & RETURNS' ? (
            <View>
              <Text style={styles.descriptionText}>
                An urban essential designed for the modern gentleman. Crafted for comfort and
                versatility, these trousers redefine your everyday wardrobe. From desk to dinner,
                embrace a timeless aesthetic that exudes confidence and refinement. Elevate your
                urban sophistication with every stride.
              </Text>

              {/* Bullet List */}
              <View style={styles.bulletContainer}>
                <Text style={styles.bulletText}>- Regular Fit</Text>
                <Text style={styles.bulletText}>- Mid Rise</Text>
                <Text style={styles.bulletText}>- 8 way Stretch Fabric</Text>
                <Text style={styles.bulletText}>- 4 Pocket Detailing</Text>
                <Text style={styles.bulletText}>- Button and Zipper Closure</Text>
              </View>

              {/* Highlighted Section */}
              <Text style={styles.boldText}>7 Days No Wash & No Iron</Text>

              {/* Size Details */}
              <Text style={styles.sizeText}>
                SIZE{'\n'}
                Model height 188cm. The model (Chest-39, Waist-32, Hips-38) is wearing a size M.
              </Text>
            </View>
          ) : (
            <Text style={styles.contentText}>{content}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff', 
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bulletContainer: {
    marginVertical: 8,
  },
  bulletText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    lineHeight: 20,
  },
  contentText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});
