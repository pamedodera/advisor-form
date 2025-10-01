export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const formData = JSON.parse(event.body);

    const { firms, userEmail } = formData;

    if (!firms || !Array.isArray(firms) || firms.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Build firm details blocks
    const firmBlocks = firms.flatMap((firm, index) => {
      const fields = [
        {
          type: "mrkdwn",
          text: `*Firm Name:*\n${firm.firmName}`
        },
        {
          type: "mrkdwn",
          text: `*Status:*\n${firm.isMatched ? '✅ Matched' : '❌ Not Matched'}`
        }
      ];

      // Add contact details if firm is matched
      if (firm.isMatched && firm.contactName) {
        fields.push(
          {
            type: "mrkdwn",
            text: `*Contact Name:*\n${firm.contactName}`
          },
          {
            type: "mrkdwn",
            text: `*Designation:*\n${firm.contactDesignation || 'Not specified'}`
          },
          {
            type: "mrkdwn",
            text: `*Relationship:*\n${formatRelationshipStrength(firm.relationshipStrength)}`
          },
          {
            type: "mrkdwn",
            text: `*Contact Frequency:*\n${formatContactFrequency(firm.contactFrequency)}`
          }
        );
      }

      return [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Firm ${index + 1}:*`
          }
        },
        {
          type: "section",
          fields: fields
        },
        {
          type: "divider"
        }
      ];
    });

    const slackMessage = {
      text: "New Network Assist Form Submission",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🆕 New Network Assist Form Submission"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*User Email:*\n${userEmail || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Total Firms:*\n${firms.length}`
            }
          ]
        },
        {
          type: "divider"
        },
        ...firmBlocks,
        {
          type: "context",
          elements: [
            {
              type: "plain_text",
              text: `Submitted on ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    };

    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('WEBHOOK_URL environment variable not set');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(slackMessage)
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed: ${response.status}`);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully!'
      })
    };

  } catch (error) {
    console.error('Function error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process form submission'
      })
    };
  }
};

// Helper functions to format enum values
function formatRelationshipStrength(value) {
  const mapping = {
    'very-strong': 'Very Strong',
    'strong': 'Strong',
    'moderate': 'Moderate',
    'weak': 'Weak'
  };
  return mapping[value] || 'Not specified';
}

function formatContactFrequency(value) {
  const mapping = {
    'quarterly': 'Quarterly',
    'annually': 'Annually',
    'occasionally': 'Occasionally',
    'recently': 'Recently'
  };
  return mapping[value] || 'Not specified';
}
