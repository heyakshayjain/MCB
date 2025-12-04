import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Linking, Alert, Clipboard, PanResponder, Animated, Dimensions, Vibration } from 'react-native';
import { WebView } from 'react-native-webview';
import { Globe, Search, ExternalLink, Home, RefreshCw, ArrowLeft, ArrowRight, Crown, Copy, Check, X } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PremiumBrowserScreen({ route }: any) {
  const { url: initialUrl } = route.params || {};
  const webViewRef = useRef<WebView>(null);
  const [url, setUrl] = useState(initialUrl || 'https://www.google.com');
  const [currentUrl, setCurrentUrl] = useState(initialUrl || 'https://www.google.com');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBrowser, setShowBrowser] = useState(!!initialUrl);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [showCopyConfirm, setShowCopyConfirm] = useState(false);
  const [showQuickCopyMenu, setShowQuickCopyMenu] = useState(false);
  const [showDocumentPicker, setShowDocumentPicker] = useState(false);
  const [activeTab, setActiveTab] = useState<'data' | 'documents'>('data');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [connectionSpeed, setConnectionSpeed] = useState<string>('...');
  const urlInputRef = useRef<TextInput>(null);

  // Document drag state
  const [draggingDocIndex, setDraggingDocIndex] = useState<number | null>(null);
  const documentPans = useRef<{ [key: number]: Animated.ValueXY }>({});
  const documentDragStartTimes = useRef<{ [key: number]: number }>({});

  // Draggable floating ball state
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const pan = useRef(new Animated.ValueXY({ 
    x: SCREEN_WIDTH - 80, 
    y: SCREEN_HEIGHT - 150 
  })).current;
  const [isDragging, setIsDragging] = useState(false);
  const currentPosition = useRef({ x: SCREEN_WIDTH - 80, y: SCREEN_HEIGHT - 150 });
  const dragStartTime = useRef(0);

  // Pan responder for drag functionality
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only start dragging if moved more than 5 pixels
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        dragStartTime.current = Date.now();
        setIsDragging(false);
      },
      onPanResponderMove: (_, gestureState) => {
        // If moved more than 10 pixels, it's a drag
        if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
          if (!isDragging) {
            setIsDragging(true);
          }
        }
        
        // Update position immediately
        const newX = currentPosition.current.x + gestureState.dx;
        const newY = currentPosition.current.y + gestureState.dy;
        
        pan.setValue({ x: newX, y: newY });
      },
      onPanResponderRelease: (_, gesture) => {
        const dragDuration = Date.now() - dragStartTime.current;
        const dragDistance = Math.sqrt(gesture.dx * gesture.dx + gesture.dy * gesture.dy);

        // If it was a quick tap (< 200ms and < 10px movement), treat as click
        if (dragDuration < 200 && dragDistance < 10) {
          setIsDragging(false);
          setShowFloatingMenu(!showFloatingMenu);
          return;
        }

        // Otherwise it was a drag
        setIsDragging(false);

        // Calculate final position
        let finalX = currentPosition.current.x + gesture.dx;
        let finalY = currentPosition.current.y + gesture.dy;

        // Keep within bounds
        const padding = 10;
        const ballSize = 60;
        if (finalX < padding) finalX = padding;
        if (finalX > SCREEN_WIDTH - ballSize - padding) finalX = SCREEN_WIDTH - ballSize - padding;
        if (finalY < 100) finalY = 100;
        if (finalY > SCREEN_HEIGHT - ballSize - 100) finalY = SCREEN_HEIGHT - ballSize - 100;

        currentPosition.current = { x: finalX, y: finalY };

        Animated.spring(pan, {
          toValue: { x: finalX, y: finalY },
          useNativeDriver: false,
          friction: 7,
          tension: 40,
        }).start();
      },
    })
  ).current;

  // Create pan responder for document drag and drop
  const createDocumentPanResponder = (docIndex: number, doc: any) => {
    if (!documentPans.current[docIndex]) {
      documentPans.current[docIndex] = new Animated.ValueXY();
    }
    
    const docPan = documentPans.current[docIndex];
    
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        documentDragStartTimes.current[docIndex] = Date.now();
        docPan.setOffset({
          x: (docPan.x as any)._value,
          y: (docPan.y as any)._value,
        });
        docPan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        // Only set dragging if moved more than 10 pixels
        if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
          if (draggingDocIndex !== docIndex) {
            setDraggingDocIndex(docIndex);
          }
        }
        return Animated.event(
          [null, { dx: docPan.x, dy: docPan.y }],
          { useNativeDriver: false }
        )(_, gestureState);
      },
      onPanResponderRelease: (_, gesture) => {
        const dragDuration = Date.now() - (documentDragStartTimes.current[docIndex] || 0);
        const dragDistance = Math.sqrt(gesture.dx * gesture.dx + gesture.dy * gesture.dy);
        
        setDraggingDocIndex(null);
        
        // If it was a quick tap (< 200ms and < 10px movement), treat as tap
        if (dragDuration < 200 && dragDistance < 10) {
          handleDocumentSelect(doc);
          Animated.spring(docPan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 7,
            tension: 40,
          }).start();
          return;
        }
        
        // If it was a drag - check drop position
        const dropY = gesture.moveY;
        if (dropY < SCREEN_HEIGHT / 2) {
          handleDocumentSelect(doc);
        }
        
        // Animate back to original position
        Animated.spring(docPan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
          friction: 7,
          tension: 40,
        }).start();
      },
    });
  };

  // Quick copy data
  const quickCopyFields = [
    { label: 'Name', value: 'Akshay Jain', icon: '👤' },
    { label: 'Email', value: 'akshay@example.com', icon: '📧' },
    { label: 'Phone', value: '+91 98765 43210', icon: '📱' },
    { label: 'DOB', value: '01/01/2005', icon: '🎂' },
    { label: 'Address', value: '123 Main Street, Mumbai, Maharashtra 400001', icon: '🏠' },
    { label: 'Category', value: 'General', icon: '📋' },
    { label: 'Aadhar', value: '1234 5678 9012', icon: '🆔' },
    { label: 'Parent Phone', value: '+91 98765 43211', icon: '👨‍👩‍👦' },
  ];

  // User documents
  const userDocuments = [
    { 
      label: 'Photo ID (Aadhar)', 
      filename: 'aadhar_card.pdf', 
      size: '245 KB', 
      icon: '🆔', 
      type: 'id',
      uri: require('../../assets/documents/aadhar_card.pdf')
    },
    { 
      label: 'Class 10 Marksheet', 
      filename: 'class_10_marksheet.pdf', 
      size: '180 KB', 
      icon: '📄', 
      type: 'certificate',
      uri: require('../../assets/documents/sample_marksheet.pdf')
    },
    { 
      label: 'Class 12 Marksheet', 
      filename: 'class_12_marksheet.pdf', 
      size: '195 KB', 
      icon: '📄', 
      type: 'certificate',
      uri: null // Mock - no actual file
    },
    { 
      label: 'Category Certificate', 
      filename: 'category_cert.pdf', 
      size: '120 KB', 
      icon: '📜', 
      type: 'certificate',
      uri: null // Mock - no actual file
    },
    { 
      label: 'Passport Photo', 
      filename: 'passport_photo.jpg', 
      size: '85 KB', 
      icon: '📸', 
      type: 'photo',
      uri: null // Mock - no actual file
    },
    { 
      label: 'Signature', 
      filename: 'signature.jpg', 
      size: '45 KB', 
      icon: '✍️', 
      type: 'photo',
      uri: null // Mock - no actual file
    },
  ];

  // Handle URL parameter changes
  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
      setCurrentUrl(initialUrl);
      setShowBrowser(true);
    }
  }, [initialUrl]);

  // Simulate network speed detection with actual speed values
  useEffect(() => {
    // Simulate getting actual network speed in Mbps
    const simulateSpeed = () => {
      const speedType = Math.random();
      if (speedType < 0.4) {
        // WiFi: 50-100 Mbps
        const speed = Math.floor(Math.random() * 50) + 50;
        setConnectionSpeed(`${speed} Mbps` as any);
      } else if (speedType < 0.7) {
        // 5G: 100-500 Mbps
        const speed = Math.floor(Math.random() * 400) + 100;
        setConnectionSpeed(`${speed} Mbps` as any);
      } else if (speedType < 0.95) {
        // 4G: 10-50 Mbps
        const speed = Math.floor(Math.random() * 40) + 10;
        setConnectionSpeed(`${speed} Mbps` as any);
      } else {
        // Slow: 1-10 Mbps
        const speed = Math.floor(Math.random() * 9) + 1;
        setConnectionSpeed(`${speed} Mbps` as any);
      }
    };
    
    simulateSpeed();
    // Update speed every 10 seconds
    const interval = setInterval(simulateSpeed, 10000);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { name: 'JEE Main', url: 'https://jeemain.nta.nic.in', icon: '📚' },
    { name: 'JEE Advanced', url: 'https://jeeadv.ac.in', icon: '🎓' },
    { name: 'BITS Pilani', url: 'https://www.bits-pilani.ac.in', icon: '🏛️' },
    { name: 'IIT Bombay', url: 'https://www.iitb.ac.in', icon: '🏫' },
    { name: 'IIT Delhi', url: 'https://home.iitd.ac.in', icon: '🎯' },
    { name: 'NIT Trichy', url: 'https://www.nitt.edu', icon: '🏢' },
  ];

  const recentVisits = [
    { title: 'JEE Main Application Form', url: 'jeemain.nta.nic.in', time: '2h ago' },
    { title: 'BITS Pilani Admissions', url: 'bits-pilani.ac.in', time: '1 day ago' },
    { title: 'IIT Bombay Programs', url: 'iitb.ac.in', time: '2 days ago' },
  ];

  const handleOpenUrl = (linkUrl: string) => {
    // Check if it's a search query or URL
    const isUrl = linkUrl.includes('.') || linkUrl.startsWith('http');
    
    if (isUrl) {
      const formattedUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
      setUrl(formattedUrl);
      setCurrentUrl(formattedUrl);
    } else {
      // Treat as Google search
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(linkUrl)}`;
      setUrl(searchUrl);
      setCurrentUrl(searchUrl);
    }
    setShowBrowser(true);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      handleOpenUrl(searchUrl);
    }
  };

  const handleGoBack = () => {
    webViewRef.current?.goBack();
  };

  const handleGoForward = () => {
    webViewRef.current?.goForward();
  };

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  const handleHome = () => {
    setShowBrowser(false);
  };

  const handleCopyText = async (text: string) => {
    await Clipboard.setString(text);
    setCopiedText(text);
    setShowCopyConfirm(true);
    setTimeout(() => setShowCopyConfirm(false), 2000);
  };

  const handleCopyUrl = () => {
    handleCopyText(currentUrl);
  };

  const handleQuickCopy = (text: string, label: string) => {
    handleCopyText(text);
    Alert.alert('Copied!', `${label} copied to clipboard`);
  };

  const handleDocumentSelect = (doc: any) => {
    setSelectedDocument(doc);
    
    // Check if document has actual file
    if (!doc.uri) {
      Alert.alert(
        'Mock Document',
        `${doc.label} is a placeholder. Real file upload would work with actual documents like Aadhar Card and Class 10 Marksheet.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Create a form data with the document information
    const documentData = JSON.stringify({
      filename: doc.filename,
      label: doc.label,
      type: doc.type,
      size: doc.size,
      hasFile: !!doc.uri
    });

    // Inject script to handle file upload
    webViewRef.current?.injectJavaScript(`
      (function() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        if (fileInputs.length > 0) {
          // Create a custom event to signal document selection
          const docData = ${documentData};
          
          // Highlight all file inputs with animation
          fileInputs.forEach((input, index) => {
            input.style.transition = 'all 0.3s ease';
            input.style.border = '3px solid #34C759';
            input.style.padding = '12px';
            input.style.borderRadius = '8px';
            input.style.backgroundColor = '#E8F5E9';
            input.style.cursor = 'pointer';
            input.style.boxShadow = '0 4px 12px rgba(52, 199, 89, 0.3)';
            
            // Add pulsing animation
            input.style.animation = 'pulse 1.5s infinite';
            
            // Store document info for later use
            input.dataset.mcbDocument = JSON.stringify(docData);
            
            // Auto-click first input after highlight
            if (index === 0) {
              setTimeout(() => {
                input.click();
              }, 400);
            }
          });
          
          // Add pulse animation keyframes
          if (!document.getElementById('mcb-pulse-style')) {
            const style = document.createElement('style');
            style.id = 'mcb-pulse-style';
            style.textContent = \`
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
              }
            \`;
            document.head.appendChild(style);
          }
          
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'info', 
            text: 'Found ' + fileInputs.length + ' upload field(s). Ready to upload ${doc.filename}' 
          }));
        } else {
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'error', 
            text: 'No file upload field found. Please navigate to a form with file upload first.' 
          }));
        }
      })();
      true;
    `);
    
    // Show confirmation and close menu
    Alert.alert(
      '✅ Document Ready',
      `${doc.label} (${doc.size}) is selected.\n\nThe upload field will be highlighted with a green glow. Click it to upload.`,
      [{ text: 'Got it!', onPress: () => setShowQuickCopyMenu(false) }]
    );
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
    setUrl(navState.url);
  };

  const injectAutoFillScript = `
    (function() {
      // Auto-fill helper function
      window.MCBAutoFill = function(data) {
        const fields = {
          name: ['name', 'fullname', 'full_name', 'applicant_name'],
          email: ['email', 'e-mail', 'emailaddress', 'email_address'],
          phone: ['phone', 'mobile', 'contact', 'telephone', 'phone_number'],
          dob: ['dob', 'dateofbirth', 'date_of_birth', 'birthdate'],
        };
        
        Object.keys(fields).forEach(key => {
          fields[key].forEach(fieldName => {
            const input = document.querySelector(\`input[name*="\${fieldName}"], input[id*="\${fieldName}"]\`);
            if (input && data[key]) {
              input.value = data[key];
              input.dispatchEvent(new Event('input', { bubbles: true }));
            }
          });
        });
      };

      // Copy helper
      window.MCBCopy = function() {
        const selection = window.getSelection().toString();
        if (selection) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'copy', text: selection }));
        }
      };

      // Add copy button on text selection
      document.addEventListener('selectionchange', function() {
        const selection = window.getSelection().toString();
        if (selection && selection.length > 0) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'selection', text: selection }));
        }
      });
    })();
    true;
  `;

  if (showBrowser) {
    return (
      <View style={styles.container}>
        {/* Drag Drop Indicator Overlay */}
        {draggingDocIndex !== null && (
          <View style={styles.dragDropOverlay}>
            <View style={styles.dropZone}>
              <Text style={styles.dropZoneIcon}>📤</Text>
              <Text style={styles.dropZoneText}>Drop document on form field</Text>
              <Text style={styles.dropZoneHint}>Release to auto-fill</Text>
            </View>
          </View>
        )}

        {/* Browser Header */}
        <View style={styles.browserHeader}>
          {/* Speed Indicator */}
          <View style={styles.speedIndicator}>
            <View style={styles.speedBadge}>
              <View style={styles.signalBars}>
                <View style={[styles.signalBar, styles.signalBar1]} />
                <View style={[styles.signalBar, styles.signalBar2]} />
                <View style={[styles.signalBar, styles.signalBar3]} />
              </View>
              <Text style={styles.speedText}>⚡ {connectionSpeed}</Text>
            </View>
          </View>

          <View style={styles.browserControls}>
            <TouchableOpacity 
              style={[styles.controlButton, !canGoBack && styles.controlButtonDisabled]} 
              onPress={handleGoBack}
              disabled={!canGoBack}
            >
              <ArrowLeft size={20} color={canGoBack ? '#007AFF' : '#C7C7CC'} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.controlButton, !canGoForward && styles.controlButtonDisabled]} 
              onPress={handleGoForward}
              disabled={!canGoForward}
            >
              <ArrowRight size={20} color={canGoForward ? '#007AFF' : '#C7C7CC'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleRefresh}>
              <RefreshCw size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleHome}>
              <Home size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleCopyUrl}>
              <Copy size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {/* URL Bar */}
          <View style={styles.urlBar}>
            <Globe size={16} color="#8E8E93" />
            <TextInput
              ref={urlInputRef}
              style={styles.urlInput}
              value={url}
              onChangeText={setUrl}
              placeholder="Search or enter website..."
              placeholderTextColor="#C7C7CC"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => handleOpenUrl(url)}
              onFocus={(e) => {
                // Select all text immediately when field is focused
                setTimeout(() => {
                  urlInputRef.current?.setNativeProps({
                    selection: { start: 0, end: url.length }
                  });
                }, 10);
              }}
              onPressIn={() => {
                // Also select all when user presses on the field
                setTimeout(() => {
                  urlInputRef.current?.setNativeProps({
                    selection: { start: 0, end: url.length }
                  });
                }, 50);
              }}
              selectTextOnFocus={true}
            />
            <TouchableOpacity onPress={() => handleOpenUrl(url)}>
              <Text style={styles.goButton}>Go</Text>
            </TouchableOpacity>
          </View>

          {showCopyConfirm && (
            <View style={styles.copyConfirm}>
              <Check size={16} color="#34C759" />
              <Text style={styles.copyConfirmText}>Copied to clipboard!</Text>
            </View>
          )}
        </View>

        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={styles.webView}
          onNavigationStateChange={handleNavigationStateChange}
          injectedJavaScript={injectAutoFillScript}
          onMessage={(event) => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.type === 'copy') {
                if (data.text) {
                  handleCopyText(data.text);
                }
              } else if (data.type === 'selection') {
                // Handle text selection
              } else if (data.type === 'info') {
                Alert.alert('Info', data.text);
              } else if (data.type === 'error') {
                Alert.alert('Error', data.text);
              }
            } catch (e) {
              // Handle error
            }
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />

        {/* Draggable Floating Ball */}
        <Animated.View 
          style={[
            styles.floatingBall,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y }
              ],
            },
            isDragging && styles.floatingBallDragging
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.floatingBallInner}>
            <Text style={styles.floatingBallIcon}>⚡</Text>
          </View>
        </Animated.View>

        {/* Floating Menu Options */}
        {showFloatingMenu && !isDragging && (
          <Animated.View 
            style={[
              styles.floatingMenuOptions,
              {
                transform: [
                  { translateX: pan.x },
                  { translateY: pan.y }
                ],
              },
            ]}
          >
            <TouchableOpacity 
              style={[styles.menuOption, styles.menuOptionPrimary]}
              onPress={() => {
                webViewRef.current?.injectJavaScript(`
                  window.MCBAutoFill({
                    name: 'Akshay Jain',
                    email: 'akshay@example.com',
                    phone: '9876543210',
                    dob: '01/01/2005'
                  });
                  true;
                `);
                Alert.alert('Auto-Fill', 'Form fields have been auto-filled!');
                setShowFloatingMenu(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.menuOptionIcon}>✨</Text>
              <Text style={styles.menuOptionText}>Auto-Fill</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuOption, styles.menuOptionSecondary]}
              onPress={() => {
                setShowQuickCopyMenu(true);
                setShowFloatingMenu(false);
              }}
              activeOpacity={0.7}
            >
              <Copy size={18} color="#FFFFFF" />
              <Text style={styles.menuOptionText}>Quick Copy</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuCloseButton}
              onPress={() => setShowFloatingMenu(false)}
              activeOpacity={0.7}
            >
              <X size={16} color="#8E8E93" />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Quick Copy Menu */}
        {showQuickCopyMenu && (
          <View style={styles.quickCopyMenu}>
            <View style={styles.quickCopyHeader}>
              <Text style={styles.quickCopyTitle}>Quick Access</Text>
              <TouchableOpacity onPress={() => setShowQuickCopyMenu(false)}>
                <X size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'data' && styles.tabActive]}
                onPress={() => setActiveTab('data')}
              >
                <Text style={[styles.tabText, activeTab === 'data' && styles.tabTextActive]}>
                  Personal Data
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'documents' && styles.tabActive]}
                onPress={() => setActiveTab('documents')}
              >
                <Text style={[styles.tabText, activeTab === 'documents' && styles.tabTextActive]}>
                  Documents
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.quickCopyList} showsVerticalScrollIndicator={false}>
              {activeTab === 'data' ? (
                // Personal Data Tab
                <>
                  {quickCopyFields.map((field, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.quickCopyItem}
                      onPress={() => handleQuickCopy(field.value, field.label)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.quickCopyIcon}>{field.icon}</Text>
                      <View style={styles.quickCopyContent}>
                        <Text style={styles.quickCopyLabel}>{field.label}</Text>
                        <Text style={styles.quickCopyValue} numberOfLines={1}>{field.value}</Text>
                      </View>
                      <Copy size={18} color="#007AFF" />
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                // Documents Tab
                <>
                  <View style={styles.documentHint}>
                    <Text style={styles.documentHintText}>
                      �️ Long press and drag documents to file upload fields
                    </Text>
                  </View>
                  {userDocuments.map((doc, index) => {
                    if (!documentPans.current[index]) {
                      documentPans.current[index] = new Animated.ValueXY();
                    }
                    const panHandlers = createDocumentPanResponder(index, doc).panHandlers;
                    
                    return (
                      <Animated.View
                        key={index}
                        {...panHandlers}
                        style={{
                          transform: [
                            { translateX: documentPans.current[index].x },
                            { translateY: documentPans.current[index].y }
                          ],
                          zIndex: draggingDocIndex === index ? 1000 : 1,
                        }}
                      >
                        <View style={[
                          styles.documentItem,
                          draggingDocIndex === index && styles.documentItemDragging
                        ]}>
                          <View style={[
                            styles.documentIconContainer,
                            doc.uri && styles.documentIconContainerActive
                          ]}>
                            <Text style={styles.documentIcon}>{doc.icon}</Text>
                            {doc.uri && (
                              <View style={styles.activeBadge}>
                                <Text style={styles.activeBadgeText}>✓</Text>
                              </View>
                            )}
                          </View>
                          <View style={styles.documentContent}>
                            <Text style={styles.documentLabel}>{doc.label}</Text>
                            <View style={styles.documentMeta}>
                              <Text style={styles.documentFilename}>{doc.filename}</Text>
                              <Text style={styles.documentSize}> • {doc.size}</Text>
                              {doc.uri && (
                                <Text style={styles.documentReady}> • Ready</Text>
                              )}
                            </View>
                          </View>
                          <View style={styles.uploadIndicator}>
                            <Text style={styles.uploadIcon}>
                              {draggingDocIndex === index ? '🖐️' : doc.uri ? '📤' : '📋'}
                            </Text>
                          </View>
                        </View>
                      </Animated.View>
                    );
                  })}
                </>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Premium Browser</Text>
          <View style={styles.premiumBadge}>
            <Crown size={14} color="#F59E0B" />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Browse college websites & resources</Text>
      </View>

      {/* Browser Controls */}
      <View style={styles.browserControls}>
        <TouchableOpacity style={styles.controlButton}>
          <ArrowLeft size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <ArrowRight size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <RefreshCw size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Home size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* URL Bar */}
      <View style={styles.urlBar}>
        <Globe size={18} color="#6B7280" />
        <TextInput
          style={styles.urlInput}
          value={url}
          onChangeText={setUrl}
          placeholder="Enter website URL..."
          placeholderTextColor="#9CA3AF"
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => handleOpenUrl(url)}>
          <ExternalLink size={18} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Box */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Quick Search</Text>
          <View style={styles.searchBox}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search colleges, exams, or resources..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickLinkCard}
                onPress={() => handleOpenUrl(link.url)}
              >
                <Text style={styles.quickLinkIcon}>{link.icon}</Text>
                <Text style={styles.quickLinkName}>{link.name}</Text>
                <ExternalLink size={14} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Visits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Visits</Text>
          {recentVisits.map((visit, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentCard}
              onPress={() => handleOpenUrl(`https://${visit.url}`)}
            >
              <View style={styles.recentIcon}>
                <Globe size={20} color="#3B82F6" />
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentTitle}>{visit.title}</Text>
                <Text style={styles.recentUrl}>{visit.url}</Text>
              </View>
              <Text style={styles.recentTime}>{visit.time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browser Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Ad-free browsing experience</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Auto-fill application forms</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Save bookmarks & history</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Secure & private browsing</Text>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            💡 Note: Links will open in your device's default browser. For the best experience, use our desktop app's integrated browser.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  dragDropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    pointerEvents: 'none',
  },
  dropZone: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 3,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  dropZoneIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  dropZoneText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  dropZoneHint: {
    fontSize: 14,
    color: '#8E8E93',
  },
  // Browser View Styles
  browserHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  browserControls: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonDisabled: {
    opacity: 0.4,
  },
  urlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    marginHorizontal: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  urlInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  goButton: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
  },
  copyConfirm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  copyConfirmText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  webView: {
    flex: 1,
  },
  // Home View Styles
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 12,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  searchSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLinkCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickLinkIcon: {
    fontSize: 28,
  },
  quickLinkName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recentUrl: {
    fontSize: 12,
    color: '#6B7280',
  },
  recentTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  featuresList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#111827',
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  floatingBall: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 1000,
  },
  floatingBallDragging: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  floatingBallInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingBallIcon: {
    fontSize: 28,
  },
  floatingMenuOptions: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    minWidth: 180,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  menuOptionPrimary: {
    backgroundColor: '#007AFF',
  },
  menuOptionSecondary: {
    backgroundColor: '#34C759',
  },
  menuOptionIcon: {
    fontSize: 20,
  },
  menuOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuCloseButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  quickCopyMenu: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  quickCopyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  quickCopyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  quickCopyList: {
    maxHeight: 320,
  },
  quickCopyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    gap: 12,
  },
  quickCopyIcon: {
    fontSize: 24,
  },
  quickCopyContent: {
    flex: 1,
  },
  quickCopyLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 2,
  },
  quickCopyValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  documentHint: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    margin: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  documentHintText: {
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  documentItemDragging: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 15,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  documentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  documentIconContainerActive: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#34C759',
  },
  activeBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  documentIcon: {
    fontSize: 24,
  },
  documentContent: {
    flex: 1,
  },
  documentLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentFilename: {
    fontSize: 13,
    color: '#8E8E93',
  },
  documentSize: {
    fontSize: 12,
    color: '#C7C7CC',
  },
  documentReady: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
  },
  uploadIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    fontSize: 16,
  },
  speedIndicator: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  speedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  speedBadgeWiFi: {
    backgroundColor: '#E8F5E9',
  },
  speedBadge5G: {
    backgroundColor: '#E3F2FD',
  },
  speedBadge4G: {
    backgroundColor: '#FFF3E0',
  },
  speedBadgeSlow: {
    backgroundColor: '#FFEBEE',
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 12,
  },
  signalBar: {
    width: 3,
    borderRadius: 2,
  },
  signalBar1: {
    height: 4,
    backgroundColor: '#34C759',
  },
  signalBar2: {
    height: 8,
    backgroundColor: '#34C759',
  },
  signalBar3: {
    height: 12,
    backgroundColor: '#34C759',
  },
  signalBarInactive: {
    backgroundColor: '#C7C7CC',
  },
  speedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
});
